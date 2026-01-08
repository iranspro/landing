// Test Email API
import { NextRequest, NextResponse } from 'next/server';
import { getEmailService } from '@/lib/email';

export async function GET(request: NextRequest) {
  try {
    const emailService = getEmailService();
    
    await emailService.sendOTP({
      to: 'vpn@irans.pro',
      code: '123456',
      validityMinutes: 5,
    });

    return NextResponse.json({ success: true, message: 'Test email sent to vpn@irans.pro' });
  } catch (error) {
    console.error('Email test error:', error);
    return NextResponse.json(
      { error: 'Failed to send email', details: error },
      { status: 500 }
    );
  }
}
