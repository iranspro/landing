// API Route: Get User Info (Protected)
// GET /api/user/me

import { NextRequest, NextResponse } from 'next/server';
import { extractTokenFromHeader, verifyToken } from '@/lib/jwt';
import { prisma } from '@/lib/prisma';
import { getPasarGuardClient } from '@/lib/pasarguard';

export async function GET(request: NextRequest) {
  try {
    // استخراج و تایید token
    const authHeader = request.headers.get('authorization');
    const token = extractTokenFromHeader(authHeader);

    if (!token) {
      return NextResponse.json(
        {
          error: 'احراز هویت لازم است',
        },
        { status: 401 }
      );
    }

    const payload = verifyToken(token);
    if (!payload) {
      return NextResponse.json(
        {
          error: 'توکن نامعتبر یا منقضی شده',
        },
        { status: 401 }
      );
    }

    // دریافت اطلاعات کاربر
    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
    });

    if (!user) {
      return NextResponse.json(
        {
          error: 'کاربر یافت نشد',
        },
        { status: 404 }
      );
    }

    // sync کردن اطلاعات با PasarGuard (اگر سابسکریپشن داره)
    if (user.marzbanUsername) {
      try {
        const pasarguard = getPasarGuardClient();
        const pasarguardUser = await pasarguard.getUser(user.marzbanUsername);

        if (pasarguardUser) {
          // آپدیت ترافیک مصرفی
          const lastSyncedAt = user.lastSyncedAt;
          const shouldSync = !lastSyncedAt || Date.now() - lastSyncedAt.getTime() > 5 * 60 * 1000; // هر 5 دقیقه

          if (shouldSync) {
            await prisma.user.update({
              where: { id: user.id },
              data: {
                dataUsed: BigInt(pasarguardUser.used_traffic || 0),
                lastSyncedAt: new Date(),
              },
            });

            user.dataUsed = BigInt(pasarguardUser.used_traffic || 0);
            user.lastSyncedAt = new Date();
          }
        }
      } catch (error) {
        console.error('PasarGuard sync error:', error);
        // ادامه می‌دیم حتی اگر sync نشد
      }
    }

    // محاسبه وضعیت
    let status = user.subscriptionStatus;
    if (user.expiryDate && user.expiryDate < new Date()) {
      status = 'expired';
    } else if (user.dataLimit && user.dataUsed >= user.dataLimit) {
      status = 'limit_reached';
    }

    // Response
    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        createdAt: user.createdAt,
        subscription: user.subscriptionUrl
          ? {
              url: user.subscriptionUrl,
              status,
              dataLimit: user.dataLimit?.toString(),
              dataUsed: user.dataUsed.toString(),
              dataRemaining: user.dataLimit
                ? (user.dataLimit - user.dataUsed).toString()
                : null,
              expiryDate: user.expiryDate,
              createdAt: user.subscriptionCreatedAt,
            }
          : null,
      },
    });
  } catch (error) {
    console.error('Get user error:', error);

    return NextResponse.json(
      {
        error: 'خطا در دریافت اطلاعات',
      },
      { status: 500 }
    );
  }
}
