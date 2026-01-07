// Time-based OTP (TOTP) Implementation
// Generates 6-digit codes without database storage

import crypto from 'crypto';

const OTP_WINDOW = 30; // ثانیه - هر 30 ثانیه کد جدید
const OTP_DIGITS = 6;

/**
 * تولید secret منحصر به فرد برای هر ایمیل
 * این secret همیشه برای یک ایمیل ثابت است
 */
function getSecretForEmail(email: string): string {
  const masterSecret = process.env.OTP_MASTER_SECRET;
  
  if (!masterSecret) {
    throw new Error('OTP_MASTER_SECRET is not defined in environment variables');
  }
  
  const secret = crypto
    .createHmac('sha256', masterSecret)
    .update(email.toLowerCase().trim())
    .digest('base64');
  
  return secret;
}

/**
 * تولید کد TOTP برای یک ایمیل
 * @param email - ایمیل کاربر
 * @param windowOffset - offset برای چک کردن ویندوهای قبلی/بعدی (معمولا 0 یا -1)
 */
export function generateTOTP(email: string, windowOffset: number = 0): string {
  const secret = getSecretForEmail(email);
  
  // محاسبه ویندوی زمانی (هر 30 ثانیه یک ویندو)
  const epoch = Math.floor(Date.now() / 1000);
  const timeWindow = Math.floor(epoch / OTP_WINDOW) + windowOffset;
  
  // تولید HMAC-based OTP
  const hmac = crypto
    .createHmac('sha1', secret)
    .update(Buffer.from(timeWindow.toString()))
    .digest();
  
  // Dynamic truncation (RFC 6238)
  const offset = hmac[hmac.length - 1] & 0xf;
  const code =
    (((hmac[offset] & 0x7f) << 24) |
      ((hmac[offset + 1] & 0xff) << 16) |
      ((hmac[offset + 2] & 0xff) << 8) |
      (hmac[offset + 3] & 0xff)) %
    Math.pow(10, OTP_DIGITS);
  
  return code.toString().padStart(OTP_DIGITS, '0');
}

/**
 * تایید کد TOTP
 * چک می‌کند که آیا کد وارد شده با ویندوی فعلی یا قبلی مطابقت دارد
 */
export function verifyTOTP(email: string, code: string): boolean {
  if (!code || code.length !== OTP_DIGITS) {
    return false;
  }
  
  // چک ویندوی فعلی
  const currentCode = generateTOTP(email, 0);
  if (code === currentCode) {
    return true;
  }
  
  // چک ویندوی قبلی (برای تاخیر ایمیل یا تاخیر کاربر)
  const previousCode = generateTOTP(email, -1);
  if (code === previousCode) {
    return true;
  }
  
  return false;
}

/**
 * محاسبه زمان باقی‌مانده تا expire شدن کد فعلی (به ثانیه)
 */
export function getOTPTimeRemaining(): number {
  const epoch = Math.floor(Date.now() / 1000);
  const currentWindow = Math.floor(epoch / OTP_WINDOW);
  const nextWindowStart = (currentWindow + 1) * OTP_WINDOW;
  return nextWindowStart - epoch;
}

/**
 * زمان validity کد (2 ویندو = 60 ثانیه)
 */
export const OTP_VALIDITY_SECONDS = OTP_WINDOW * 2;
