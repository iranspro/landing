// API Route: Verify OTP and Create Subscription
// POST /api/auth/verify-otp

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import crypto from 'crypto';
import { verifyTOTP } from '@/lib/totp';
import { prisma } from '@/lib/prisma';
import { getPasarGuardClient } from '@/lib/pasarguard';
import { getEmailService } from '@/lib/email';
import { generateToken } from '@/lib/jwt';
import { getTelegramService } from '@/lib/telegram';

const requestSchema = z.object({
  email: z.string().email('ایمیل معتبر وارد کنید'),
  code: z.string().length(6, 'کد باید 6 رقم باشد'),
});

const DEFAULT_DATA_LIMIT = 10 * 1024 * 1024 * 1024; // 10GB در بایت
const DEFAULT_VALIDITY_DAYS = 30;

/**
 * تولید username منحصر به فرد برای مرزبان
 */
function generateUsername(email: string): string {
  const hash = crypto.createHash('md5').update(email).digest('hex').substring(0, 8);
  return `user_${hash}`;
}

export async function POST(request: NextRequest) {
  try {
    // Parse و validate
    const body = await request.json();
    const validation = requestSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          error: 'اطلاعات وارد شده معتبر نیست',
          details: validation.error.issues,
        },
        { status: 400 }
      );
    }

    const { email, code } = validation.data;
    const normalizedEmail = email.toLowerCase().trim();

    // تایید کد TOTP
    const isValid = verifyTOTP(normalizedEmail, code);
    if (!isValid) {
      return NextResponse.json(
        {
          error: 'کد وارد شده اشتباه یا منقضی شده است',
        },
        { status: 401 }
      );
    }

    // پیدا کردن یا ایجاد کاربر
    let user = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          email: normalizedEmail,
          subscriptionStatus: 'pending',
        },
      });
    }

    // چک کردن سابسکریپشن موجود
    const now = new Date();
    const hasActiveSubscription =
      user.subscriptionStatus === 'active' &&
      user.subscriptionUrl &&
      user.expiryDate &&
      user.expiryDate > now;

    let subscriptionUrl = user.subscriptionUrl;
    let marzbanUsername = user.marzbanUsername;

    // اگر سابسکریپشن فعال نداره، یکی جدید بساز
    if (!hasActiveSubscription) {
      try {
        const pasarguard = getPasarGuardClient();
        const username = marzbanUsername || generateUsername(normalizedEmail);
        const expiryTimestamp = Math.floor(Date.now() / 1000) + DEFAULT_VALIDITY_DAYS * 24 * 60 * 60;

        // چک کن آیا کاربر قبلا در PasarGuard هست
        let pasarguardUser = await pasarguard.getUser(username);

        if (pasarguardUser) {
          // آپدیت کاربر موجود
          pasarguardUser = await pasarguard.updateUser(username, {
            data_limit: DEFAULT_DATA_LIMIT,
            expire: expiryTimestamp,
          });
        } else {
          // ایجاد کاربر جدید
          pasarguardUser = await pasarguard.createUser({
            username,
            data_limit: DEFAULT_DATA_LIMIT,
            expire: expiryTimestamp,
          });
        }

        subscriptionUrl = pasarguardUser.subscription_url || null;
        marzbanUsername = username;

        // آپدیت اطلاعات در دیتابیس
        const expiryDate = new Date(expiryTimestamp * 1000);
        
        user = await prisma.user.update({
          where: { email: normalizedEmail },
          data: {
            marzbanUsername,
            subscriptionUrl,
            subscriptionStatus: 'active',
            dataLimit: BigInt(DEFAULT_DATA_LIMIT),
            dataUsed: BigInt(pasarguardUser.used_traffic || 0),
            expiryDate,
            subscriptionCreatedAt: new Date(),
            lastSyncedAt: new Date(),
          },
        });

        // ارسال ایمیل سابسکریپشن
        const emailService = getEmailService();
        await emailService.sendSubscription({
          to: normalizedEmail,
          subscriptionUrl,
          dataLimit: DEFAULT_DATA_LIMIT,
          expiryDate,
        });

        // ارسال اعلان به تلگرام
        const telegramService = getTelegramService();
        await telegramService.notifyNewSubscription({
          email: normalizedEmail,
          username: username,
          subscriptionUrl,
          dataLimit: DEFAULT_DATA_LIMIT,
          expiryDate,
          createdAt: new Date(),
        });
      } catch (error) {
        console.error('PasarGuard error:', error);
        return NextResponse.json(
          {
            error: 'خطا در ایجاد سابسکریپشن. لطفاً دوباره تلاش کنید.',
          },
          { status: 500 }
        );
      }
    }

    // صدور JWT token
    const token = generateToken(user.id, user.email);

    // Response با اطلاعات کاربر
    return NextResponse.json({
      success: true,
      token,
      user: {
        id: user.id,
        email: user.email,
        subscription: {
          url: subscriptionUrl,
          status: user.subscriptionStatus,
          dataLimit: user.dataLimit?.toString(),
          dataUsed: user.dataUsed.toString(),
          expiryDate: user.expiryDate,
        },
      },
    });
  } catch (error) {
    console.error('Verify OTP error:', error);

    return NextResponse.json(
      {
        error: 'خطا در تایید کد. لطفاً دوباره تلاش کنید.',
      },
      { status: 500 }
    );
  }
}
