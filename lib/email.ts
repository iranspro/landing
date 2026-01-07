// Email Service with Nodemailer
// Handles sending OTP and subscription emails

import nodemailer from 'nodemailer';
import type { Transporter } from 'nodemailer';

interface EmailConfig {
  host: string;
  port: number;
  secure: boolean;
  auth: {
    user: string;
    pass: string;
  };
  from: string;
}

interface SendOTPParams {
  to: string;
  code: string;
  validityMinutes: number;
}

interface SendSubscriptionParams {
  to: string;
  subscriptionUrl: string;
  dataLimit: number; // bytes
  expiryDate: Date;
}

class EmailService {
  private transporter: Transporter;
  private fromAddress: string;

  constructor(config: EmailConfig) {
    this.fromAddress = config.from;
    this.transporter = nodemailer.createTransporter({
      host: config.host,
      port: config.port,
      secure: config.secure,
      auth: config.auth,
    });
  }

  /**
   * ارسال ایمیل OTP
   */
  async sendOTP({ to, code, validityMinutes }: SendOTPParams): Promise<void> {
    const subject = `کد تایید IransPro 🔐`;
    
    const htmlContent = `
<!DOCTYPE html>
<html dir="rtl" lang="fa">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background-color: #f4f4f4;
      margin: 0;
      padding: 20px;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background: white;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    .header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 30px;
      text-align: center;
    }
    .header h1 {
      margin: 0;
      font-size: 24px;
    }
    .content {
      padding: 40px 30px;
      text-align: center;
    }
    .code-box {
      background: #f8f9fa;
      border: 2px dashed #667eea;
      border-radius: 8px;
      padding: 20px;
      margin: 30px 0;
      font-size: 32px;
      font-weight: bold;
      letter-spacing: 8px;
      color: #667eea;
      font-family: 'Courier New', monospace;
    }
    .info {
      background: #fff3cd;
      border-right: 4px solid #ffc107;
      padding: 15px;
      margin: 20px 0;
      text-align: right;
      border-radius: 4px;
    }
    .footer {
      background: #f8f9fa;
      padding: 20px;
      text-align: center;
      color: #6c757d;
      font-size: 14px;
    }
    .footer a {
      color: #667eea;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🔐 کد تایید IransPro</h1>
    </div>
    <div class="content">
      <p style="font-size: 16px; color: #333;">کد تایید شما:</p>
      <div class="code-box">${code}</div>
      <div class="info">
        ⏱️ این کد تا <strong>${validityMinutes} دقیقه</strong> دیگر معتبر است.<br>
        🔒 این کد منحصر به ایمیل شماست و قابل استفاده مجدد نیست.
      </div>
      <p style="color: #6c757d; font-size: 14px;">
        اگر شما این درخواست را نکرده‌اید، این ایمیل را نادیده بگیرید.
      </p>
    </div>
    <div class="footer">
      <p>IransPro - اینترنت آزاد برای همه</p>
      <p><a href="${process.env.NEXT_PUBLIC_APP_URL || 'https://iranspro.com'}">iranspro.com</a></p>
    </div>
  </div>
</body>
</html>
    `;

    const textContent = `
کد تایید IransPro

کد تایید شما: ${code}

این کد تا ${validityMinutes} دقیقه دیگر معتبر است.

اگر شما این درخواست را نکرده‌اید، این ایمیل را نادیده بگیرید.

---
IransPro - اینترنت آزاد برای همه
${process.env.NEXT_PUBLIC_APP_URL || 'https://iranspro.com'}
    `;

    await this.transporter.sendMail({
      from: this.fromAddress,
      to,
      subject,
      text: textContent,
      html: htmlContent,
    });
  }

  /**
   * ارسال ایمیل سابسکریپشن
   */
  async sendSubscription({ to, subscriptionUrl, dataLimit, expiryDate }: SendSubscriptionParams): Promise<void> {
    const subject = `سابسکریپشن VPN شما آماده شد! 🚀`;
    const dataLimitGB = (dataLimit / (1024 * 1024 * 1024)).toFixed(0);
    const daysUntilExpiry = Math.ceil((expiryDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
    
    const htmlContent = `
<!DOCTYPE html>
<html dir="rtl" lang="fa">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background-color: #f4f4f4;
      margin: 0;
      padding: 20px;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background: white;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    .header {
      background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
      color: white;
      padding: 30px;
      text-align: center;
    }
    .header h1 {
      margin: 0;
      font-size: 24px;
    }
    .content {
      padding: 30px;
    }
    .success-box {
      background: #d4edda;
      border: 2px solid #28a745;
      border-radius: 8px;
      padding: 20px;
      margin: 20px 0;
      text-align: center;
    }
    .success-box h2 {
      color: #28a745;
      margin: 0 0 10px 0;
    }
    .link-box {
      background: #f8f9fa;
      border: 1px solid #dee2e6;
      border-radius: 8px;
      padding: 15px;
      margin: 20px 0;
      word-break: break-all;
      text-align: center;
    }
    .copy-button {
      background: #667eea;
      color: white;
      padding: 12px 30px;
      border-radius: 6px;
      text-decoration: none;
      display: inline-block;
      margin: 10px 0;
      font-weight: bold;
    }
    .instructions {
      background: #e7f3ff;
      border-right: 4px solid #2196F3;
      padding: 20px;
      margin: 20px 0;
      text-align: right;
      border-radius: 4px;
    }
    .instructions h3 {
      margin-top: 0;
      color: #2196F3;
    }
    .instructions ol {
      margin: 10px 0;
      padding-right: 20px;
    }
    .instructions li {
      margin: 8px 0;
    }
    .specs {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 15px;
      margin: 20px 0;
    }
    .spec-item {
      background: #f8f9fa;
      padding: 15px;
      border-radius: 8px;
      text-align: center;
    }
    .spec-item strong {
      display: block;
      font-size: 24px;
      color: #667eea;
      margin-bottom: 5px;
    }
    .footer {
      background: #f8f9fa;
      padding: 20px;
      text-align: center;
      color: #6c757d;
      font-size: 14px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🚀 سابسکریپشن شما آماده است!</h1>
    </div>
    <div class="content">
      <div class="success-box">
        <h2>✅ موفقیت‌آمیز</h2>
        <p>سابسکریپشن VPN رایگان شما با موفقیت ایجاد شد!</p>
      </div>

      <h3 style="color: #333;">🔗 لینک سابسکریپشن:</h3>
      <div class="link-box">
        <code style="font-size: 12px; color: #495057;">${subscriptionUrl}</code>
      </div>
      <div style="text-align: center;">
        <a href="${subscriptionUrl}" class="copy-button">📋 کپی لینک</a>
      </div>

      <div class="instructions">
        <h3>📱 نحوه استفاده:</h3>
        <ol>
          <li><strong>دانلود اپلیکیشن:</strong>
            <ul style="list-style: none; padding-right: 10px;">
              <li>🤖 اندروید: V2rayNG</li>
              <li>🍎 iOS: Streisand یا Shadowrocket</li>
              <li>💻 ویندوز: V2rayN</li>
            </ul>
          </li>
          <li>کلیک روی لینک بالا یا کپی کنید</li>
          <li>لینک را در اپ Import کنید</li>
          <li>دکمه Connect را بزنید</li>
        </ol>
      </div>

      <h3 style="color: #333;">📊 مشخصات اشتراک:</h3>
      <div class="specs">
        <div class="spec-item">
          <strong>${dataLimitGB} GB</strong>
          <span style="color: #6c757d; font-size: 14px;">حجم</span>
        </div>
        <div class="spec-item">
          <strong>${daysUntilExpiry} روز</strong>
          <span style="color: #6c757d; font-size: 14px;">مدت</span>
        </div>
        <div class="spec-item">
          <strong>نامحدود</strong>
          <span style="color: #6c757d; font-size: 14px;">سرعت</span>
        </div>
        <div class="spec-item">
          <strong>5+</strong>
          <span style="color: #6c757d; font-size: 14px;">سرور</span>
        </div>
      </div>

      <p style="text-align: center; margin-top: 30px;">
        <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard" style="color: #667eea; text-decoration: none; font-weight: bold;">
          🔐 مشاهده داشبورد کاربری
        </a>
      </p>
    </div>
    <div class="footer">
      <p>سوال یا مشکل دارید؟</p>
      <p>📧 support@iranspro.com</p>
      <p style="margin-top: 15px;">IransPro - اینترنت آزاد برای همه</p>
    </div>
  </div>
</body>
</html>
    `;

    const textContent = `
سابسکریپشن VPN شما آماده شد!

لینک سابسکریپشن:
${subscriptionUrl}

نحوه استفاده:
1. دانلود اپ V2rayNG (اندروید) یا Streisand (iOS)
2. کپی لینک بالا
3. Import در اپ
4. Connect!

مشخصات:
- حجم: ${dataLimitGB} گیگابایت
- مدت: ${daysUntilExpiry} روز
- سرعت: نامحدود

داشبورد: ${process.env.NEXT_PUBLIC_APP_URL}/dashboard

---
IransPro - اینترنت آزاد برای همه
    `;

    await this.transporter.sendMail({
      from: this.fromAddress,
      to,
      subject,
      text: textContent,
      html: htmlContent,
    });
  }

  /**
   * تست اتصال به سرور ایمیل
   */
  async verify(): Promise<boolean> {
    try {
      await this.transporter.verify();
      return true;
    } catch (error) {
      console.error('Email service verification failed:', error);
      return false;
    }
  }
}

// Singleton instance
let emailService: EmailService | null = null;

export function getEmailService(): EmailService {
  if (!emailService) {
    const config: EmailConfig = {
      host: process.env.SMTP_HOST || '',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_PORT === '465',
      auth: {
        user: process.env.SMTP_USER || '',
        pass: process.env.SMTP_PASS || '',
      },
      from: process.env.EMAIL_FROM || 'IransPro <noreply@iranspro.com>',
    };

    if (!config.host || !config.auth.user || !config.auth.pass) {
      throw new Error('Email configuration is incomplete. Check environment variables.');
    }

    emailService = new EmailService(config);
  }

  return emailService;
}

export type { SendOTPParams, SendSubscriptionParams };
