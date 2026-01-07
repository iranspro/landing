// Marzban API Client
// Handles communication with Marzban panel for VPN management

interface MarzbanConfig {
  url: string;
  username: string;
  password: string;
}

interface MarzbanUser {
  username: string;
  proxies: {
    vmess?: Record<string, unknown>;
    vless?: Record<string, unknown>;
  };
  data_limit: number; // bytes
  expire: number; // timestamp
  data_limit_reset_strategy: string;
  status: string;
  used_traffic: number;
  lifetime_used_traffic: number;
  created_at: string;
  links: string[];
  subscription_url: string;
  excluded_inbounds?: Record<string, string[]>;
}

interface CreateUserParams {
  username: string;
  data_limit: number; // bytes
  expire: number; // timestamp
  data_limit_reset_strategy?: string;
  proxies?: Record<string, unknown>;
}

class MarzbanClient {
  private baseUrl: string;
  private username: string;
  private password: string;
  private token: string | null = null;
  private tokenExpiry: number = 0;

  constructor(config: MarzbanConfig) {
    this.baseUrl = config.url.replace(/\/$/, ''); // حذف slash انتهایی
    this.username = config.username;
    this.password = config.password;
  }

  /**
   * لاگین به مرزبان و دریافت access token
   */
  private async authenticate(): Promise<string> {
    // اگر token معتبر داریم، از همون استفاده می‌کنیم
    if (this.token && this.tokenExpiry > Date.now()) {
      return this.token;
    }

    try {
      const response = await fetch(`${this.baseUrl}/api/admin/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          username: this.username,
          password: this.password,
        }),
      });

      if (!response.ok) {
        throw new Error(`Marzban authentication failed: ${response.status}`);
      }

      const data = await response.json();
      this.token = data.access_token;
      // Token معمولا 30 دقیقه معتبره، ما 25 دقیقه در نظر می‌گیریم
      this.tokenExpiry = Date.now() + 25 * 60 * 1000;

      return this.token;
    } catch (error) {
      console.error('Marzban authentication error:', error);
      throw new Error('Failed to authenticate with Marzban panel');
    }
  }

  /**
   * ایجاد کاربر جدید در مرزبان
   */
  async createUser(params: CreateUserParams): Promise<MarzbanUser> {
    const token = await this.authenticate();

    try {
      const response = await fetch(`${this.baseUrl}/api/user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          username: params.username,
          proxies: params.proxies || {
            vmess: {},
            vless: {},
          },
          data_limit: params.data_limit,
          expire: params.expire,
          data_limit_reset_strategy: params.data_limit_reset_strategy || 'no_reset',
          status: 'active',
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to create user in Marzban: ${response.status} - ${errorText}`);
      }

      const user: MarzbanUser = await response.json();
      return user;
    } catch (error) {
      console.error('Marzban create user error:', error);
      throw error;
    }
  }

  /**
   * دریافت اطلاعات کاربر از مرزبان
   */
  async getUser(username: string): Promise<MarzbanUser | null> {
    const token = await this.authenticate();

    try {
      const response = await fetch(`${this.baseUrl}/api/user/${username}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 404) {
        return null;
      }

      if (!response.ok) {
        throw new Error(`Failed to get user from Marzban: ${response.status}`);
      }

      const user: MarzbanUser = await response.json();
      return user;
    } catch (error) {
      console.error('Marzban get user error:', error);
      throw error;
    }
  }

  /**
   * آپدیت اطلاعات کاربر در مرزبان
   */
  async updateUser(username: string, updates: Partial<CreateUserParams>): Promise<MarzbanUser> {
    const token = await this.authenticate();

    try {
      const response = await fetch(`${this.baseUrl}/api/user/${username}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updates),
      });

      if (!response.ok) {
        throw new Error(`Failed to update user in Marzban: ${response.status}`);
      }

      const user: MarzbanUser = await response.json();
      return user;
    } catch (error) {
      console.error('Marzban update user error:', error);
      throw error;
    }
  }

  /**
   * حذف کاربر از مرزبان
   */
  async deleteUser(username: string): Promise<void> {
    const token = await this.authenticate();

    try {
      const response = await fetch(`${this.baseUrl}/api/user/${username}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to delete user from Marzban: ${response.status}`);
      }
    } catch (error) {
      console.error('Marzban delete user error:', error);
      throw error;
    }
  }

  /**
   * reset کردن ترافیک مصرفی کاربر
   */
  async resetUserTraffic(username: string): Promise<MarzbanUser> {
    const token = await this.authenticate();

    try {
      const response = await fetch(`${this.baseUrl}/api/user/${username}/reset`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to reset user traffic: ${response.status}`);
      }

      const user: MarzbanUser = await response.json();
      return user;
    } catch (error) {
      console.error('Marzban reset traffic error:', error);
      throw error;
    }
  }
}

// Singleton instance
let marzbanClient: MarzbanClient | null = null;

export function getMarzbanClient(): MarzbanClient {
  if (!marzbanClient) {
    const config: MarzbanConfig = {
      url: process.env.MARZBAN_URL || '',
      username: process.env.MARZBAN_USERNAME || '',
      password: process.env.MARZBAN_PASSWORD || '',
    };

    if (!config.url || !config.username || !config.password) {
      throw new Error('Marzban configuration is incomplete. Check environment variables.');
    }

    marzbanClient = new MarzbanClient(config);
  }

  return marzbanClient;
}

export type { MarzbanUser, CreateUserParams };
