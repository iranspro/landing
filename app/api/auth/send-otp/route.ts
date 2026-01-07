// API Route: Send OTP
// POST /api/auth/send-otp

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { generateTOTP, OTP_VALIDITY_SECONDS } from '@/lib/totp';
import { getEmailService } from '@/lib/email';
import { checkOTPRateLimit, checkOTPCooldown, incrementOTPCounter } from '@/lib/rate-limit';

const requestSchema = z.object({
  email: z.string().email('ایمیل معتبر وارد کنید'),
});

export async function POST(request: NextRequest) {
  try {
    // Parse و validate کردن request body
    const body = await request.json();
    const validation = requestSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          error: 'ایمیل معتبر وارد کنید',
          details: validation.error.issues,
        },
        { status: 400 }
      );
    }

    const { email } = validation.data;
    const normalizedEmail = email.toLowerCase().trim();

    // چک rate limit (حداکثر 3 بار در ساعت)
    const rateLimitResult = await checkOTPRateLimit(normalizedEmail);
    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        {
          error: rateLimitResult.message,
          resetAt: rateLimitResult.resetAt,
        },
        { status: 429 }
      );
    }

    // چک cooldown (حداقل 30 ثانیه بین هر درخواست)
    const cooldownResult = await checkOTPCooldown(normalizedEmail);
    if (!cooldownResult.allowed) {
      return NextResponse.json(
        {
          error: `لطفاً ${cooldownResult.secondsRemaining} ثانیه صبر کنید`,
          secondsRemaining: cooldownResult.secondsRemaining,
        },
        { status: 429 }
      );
    }

    // تولید کد TOTP
    const otpCode = generateTOTP(normalizedEmail);

    // ارسال ایمیل
    const emailService = getEmailService();
    await emailService.sendOTP({
      to: normalizedEmail,
      code: otpCode,
      validityMinutes: Math.ceil(OTP_VALIDITY_SECONDS / 60),
    });

    // آپدیت counter
    await incrementOTPCounter(normalizedEmail);

    // Response موفق
    return NextResponse.json({
      success: true,
      message: 'کد تایید به ایمیل شما ارسال شد',
      expiresIn: OTP_VALIDITY_SECONDS,
      remaining: rateLimitResult.remaining,
    });
  } catch (error) {
    console.error('Send OTP error:', error);
    
    return NextResponse.json(
      {
        error: 'خطا در ارسال کد. لطفاً دوباره تلاش کنید.',
      },
      { status: 500 }
    );
  }
}
