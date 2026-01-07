// Rate Limiting Helper
// Prevents abuse by limiting OTP requests

import { prisma } from './prisma';

const MAX_REQUESTS_PER_HOUR = 3;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 ساعت

interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetAt: Date;
  message?: string;
}

/**
 * چک کردن rate limit برای درخواست OTP
 */
export async function checkOTPRateLimit(email: string): Promise<RateLimitResult> {
  const now = new Date();

  // پیدا کردن یا ایجاد کاربر
  let user = await prisma.user.findUnique({
    where: { email: email.toLowerCase().trim() },
  });

  // اگر کاربر جدیده، اجازه بده
  if (!user) {
    return {
      allowed: true,
      remaining: MAX_REQUESTS_PER_HOUR - 1,
      resetAt: new Date(now.getTime() + RATE_LIMIT_WINDOW_MS),
    };
  }

  // اگر ویندوی rate limit گذشته، reset کن
  if (!user.otpRequestsResetAt || now >= user.otpRequestsResetAt) {
    return {
      allowed: true,
      remaining: MAX_REQUESTS_PER_HOUR - 1,
      resetAt: new Date(now.getTime() + RATE_LIMIT_WINDOW_MS),
    };
  }

  // چک کردن تعداد درخواست‌ها
  if (user.otpRequestCount >= MAX_REQUESTS_PER_HOUR) {
    const waitMinutes = Math.ceil(
      (user.otpRequestsResetAt.getTime() - now.getTime()) / 60000
    );

    return {
      allowed: false,
      remaining: 0,
      resetAt: user.otpRequestsResetAt,
      message: `شما به حد مجاز درخواست رسیده‌اید. لطفاً ${waitMinutes} دقیقه دیگر تلاش کنید.`,
    };
  }

  // اجازه بده و counter رو افزایش بده
  return {
    allowed: true,
    remaining: MAX_REQUESTS_PER_HOUR - user.otpRequestCount - 1,
    resetAt: user.otpRequestsResetAt,
  };
}

/**
 * آپدیت کردن counter بعد از ارسال OTP
 */
export async function incrementOTPCounter(email: string): Promise<void> {
  const now = new Date();
  const resetAt = new Date(now.getTime() + RATE_LIMIT_WINDOW_MS);

  const user = await prisma.user.findUnique({
    where: { email: email.toLowerCase().trim() },
  });

  if (!user) {
    // ایجاد کاربر جدید
    await prisma.user.create({
      data: {
        email: email.toLowerCase().trim(),
        lastOtpSent: now,
        otpRequestCount: 1,
        otpRequestsResetAt: resetAt,
        subscriptionStatus: 'pending',
      },
    });
  } else {
    // اگر ویندوی جدیده، reset کن
    if (!user.otpRequestsResetAt || now >= user.otpRequestsResetAt) {
      await prisma.user.update({
        where: { email: email.toLowerCase().trim() },
        data: {
          lastOtpSent: now,
          otpRequestCount: 1,
          otpRequestsResetAt: resetAt,
        },
      });
    } else {
      // افزایش counter
      await prisma.user.update({
        where: { email: email.toLowerCase().trim() },
        data: {
          lastOtpSent: now,
          otpRequestCount: user.otpRequestCount + 1,
        },
      });
    }
  }
}

/**
 * چک کردن فاصله زمانی بین درخواست‌ها (حداقل 30 ثانیه)
 */
export async function checkOTPCooldown(email: string): Promise<{ allowed: boolean; secondsRemaining?: number }> {
  const user = await prisma.user.findUnique({
    where: { email: email.toLowerCase().trim() },
  });

  if (!user || !user.lastOtpSent) {
    return { allowed: true };
  }

  const now = new Date();
  const timeSinceLastRequest = now.getTime() - user.lastOtpSent.getTime();
  const cooldownMs = 30 * 1000; // 30 ثانیه

  if (timeSinceLastRequest < cooldownMs) {
    const secondsRemaining = Math.ceil((cooldownMs - timeSinceLastRequest) / 1000);
    return {
      allowed: false,
      secondsRemaining,
    };
  }

  return { allowed: true };
}
