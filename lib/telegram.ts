// Telegram Notification Service
// Sends notifications to Telegram channel/group

interface TelegramConfig {
  botToken: string;
  chatId: string;
}

interface NewSubscriptionNotification {
  email: string;
  username: string;
  subscriptionUrl: string;
  dataLimit: number; // bytes
  expiryDate: Date;
  createdAt: Date;
}

class TelegramService {
  private botToken: string;
  private chatId: string;
  private baseUrl: string;

  constructor(config: TelegramConfig) {
    this.botToken = config.botToken;
    this.chatId = config.chatId;
    this.baseUrl = `https://api.telegram.org/bot${this.botToken}`;
  }

  /**
   * ارسال پیام به تلگرام
   */
  private async sendMessage(text: string, parseMode: 'HTML' | 'Markdown' = 'HTML'): Promise<void> {
    try {
      const response = await fetch(`${this.baseUrl}/sendMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: this.chatId,
          text,
          parse_mode: parseMode,
          disable_web_page_preview: false,
        }),
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(`Telegram API error: ${response.status} - ${error}`);
      }
    } catch (error) {
      console.error('Telegram notification error:', error);
      // Don't throw - notification failure shouldn't break the main flow
    }
  }

  /**
   * اعلان سابسکریپشن جدید
   */
  async notifyNewSubscription(data: NewSubscriptionNotification): Promise<void> {
    const dataLimitGB = (data.dataLimit / (1024 * 1024 * 1024)).toFixed(0);
    const daysUntilExpiry = Math.ceil((data.expiryDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24));

    const message = `
🎉 <b>سابسکریپشن جدید ایجاد شد!</b>

👤 <b>کاربر:</b> <code>${data.username}</code>
📧 <b>ایمیل:</b> <code>${data.email}</code>

📊 <b>مشخصات:</b>
• حجم: ${dataLimitGB} GB
• مدت: ${daysUntilExpiry} روز
• تاریخ انقضا: ${data.expiryDate.toLocaleDateString('fa-IR')}

🔗 <b>لینک سابسکریپشن:</b>
<code>${data.subscriptionUrl}</code>

⏰ زمان ثبت: ${data.createdAt.toLocaleString('fa-IR')}

🚀 IransPro - اینترنت آزاد برای همه
`.trim();

    await this.sendMessage(message);
  }

  /**
   * اعلان خطا یا مشکل
   */
  async notifyError(error: string, context?: string): Promise<void> {
    const message = `
⚠️ <b>خطا در سیستم</b>

${context ? `📍 <b>محل:</b> ${context}\n` : ''}
❌ <b>پیام خطا:</b>
<code>${error}</code>

⏰ زمان: ${new Date().toLocaleString('fa-IR')}
`.trim();

    await this.sendMessage(message);
  }

  /**
   * اعلان آمار روزانه
   */
  async notifyDailyStats(stats: {
    newUsers: number;
    totalUsers: number;
    activeSubscriptions: number;
    totalTraffic: number; // bytes
  }): Promise<void> {
    const trafficGB = (stats.totalTraffic / (1024 * 1024 * 1024)).toFixed(2);

    const message = `
📊 <b>آمار روزانه IransPro</b>

👥 کاربران جدید امروز: ${stats.newUsers}
📈 مجموع کاربران: ${stats.totalUsers}
✅ سابسکریپشن‌های فعال: ${stats.activeSubscriptions}
📡 ترافیک مصرفی: ${trafficGB} GB

📅 ${new Date().toLocaleDateString('fa-IR')}
`.trim();

    await this.sendMessage(message);
  }

  /**
   * تست اتصال
   */
  async testConnection(): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/getMe`);
      return response.ok;
    } catch (error) {
      console.error('Telegram connection test failed:', error);
      return false;
    }
  }
}

// Singleton instance
let telegramService: TelegramService | null = null;

export function getTelegramService(): TelegramService {
  if (!telegramService) {
    const config: TelegramConfig = {
      botToken: process.env.TELEGRAM_BOT_TOKEN || '',
      chatId: process.env.TELEGRAM_CHAT_ID || '',
    };

    if (!config.botToken || !config.chatId) {
      console.warn('Telegram configuration is incomplete. Notifications will be disabled.');
      // Return a dummy service that does nothing
      return {
        notifyNewSubscription: async () => {},
        notifyError: async () => {},
        notifyDailyStats: async () => {},
        testConnection: async () => false,
      } as TelegramService;
    }

    telegramService = new TelegramService(config);
  }

  return telegramService;
}

export type { NewSubscriptionNotification };
