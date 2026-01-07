// PasarGuard API Client
// Handles communication with PasarGuard panel for VPN management

interface PasarGuardConfig {
  url: string;
  username: string;
  password: string;
}

interface PasarGuardUser {
  id: number;
  username: string;
  status: 'active' | 'disabled' | 'limited' | 'expired' | 'on_hold';
  used_traffic: number;
  lifetime_used_traffic?: number;
  data_limit: number | null;
  expire: string | number | null;
  created_at: string;
  subscription_url?: string;
  proxy_settings?: {
    vmess?: Record<string, unknown>;
    vless?: Record<string, unknown>;
    trojan?: Record<string, unknown>;
    shadowsocks?: Record<string, unknown>;
  };
}

interface CreateUserParams {
  username: string;
  data_limit: number | null; // bytes
  expire: number | null; // timestamp
  data_limit_reset_strategy?: 'no_reset' | 'day' | 'week' | 'month' | 'year';
  status?: 'active' | 'on_hold';
  proxy_settings?: Record<string, unknown>;
}

class PasarGuardClient {
  private baseUrl: string;
  private username: string;
  private password: string;
  private token: string | null = null;
  private tokenExpiry: number = 0;

  constructor(config: PasarGuardConfig) {
    this.baseUrl = config.url.replace(/\/$/, ''); // حذف slash انتهایی
    this.username = config.username;
    this.password = config.password;
  }

  /**
   * لاگین به PasarGuard و دریافت access token
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
        throw new Error(`PasarGuard authentication failed: ${response.status}`);
      }

      const data = await response.json();
      this.token = data.access_token;
      // Token معمولا 30 دقیقه معتبره، ما 25 دقیقه در نظر می‌گیریم
      this.tokenExpiry = Date.now() + 25 * 60 * 1000;

      return this.token!;
    } catch (error) {
      console.error('PasarGuard authentication error:', error);
      throw new Error('Failed to authenticate with PasarGuard panel');
    }
  }

  /**
   * ایجاد کاربر جدید در PasarGuard
   */
  async createUser(params: CreateUserParams): Promise<PasarGuardUser> {
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
          proxy_settings: params.proxy_settings || {
            vmess: {},
            vless: {},
          },
          data_limit: params.data_limit,
          expire: params.expire,
          data_limit_reset_strategy: params.data_limit_reset_strategy || 'no_reset',
          status: params.status || 'active',
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to create user in PasarGuard: ${response.status} - ${errorText}`);
      }

      const user: PasarGuardUser = await response.json();
      return user;
    } catch (error) {
      console.error('PasarGuard create user error:', error);
      throw error;
    }
  }

  /**
   * دریافت اطلاعات کاربر از PasarGuard
   */
  async getUser(username: string): Promise<PasarGuardUser | null> {
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
        throw new Error(`Failed to get user from PasarGuard: ${response.status}`);
      }

      const user: PasarGuardUser = await response.json();
      return user;
    } catch (error) {
      console.error('PasarGuard get user error:', error);
      throw error;
    }
  }

  /**
   * آپدیت اطلاعات کاربر در PasarGuard
   */
  async updateUser(username: string, updates: Partial<CreateUserParams>): Promise<PasarGuardUser> {
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
        throw new Error(`Failed to update user in PasarGuard: ${response.status}`);
      }

      const user: PasarGuardUser = await response.json();
      return user;
    } catch (error) {
      console.error('PasarGuard update user error:', error);
      throw error;
    }
  }

  /**
   * حذف کاربر از PasarGuard
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
        throw new Error(`Failed to delete user from PasarGuard: ${response.status}`);
      }
    } catch (error) {
      console.error('PasarGuard delete user error:', error);
      throw error;
    }
  }

  /**
   * reset کردن ترافیک مصرفی کاربر
   */
  async resetUserTraffic(username: string): Promise<PasarGuardUser> {
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

      const user: PasarGuardUser = await response.json();
      return user;
    } catch (error) {
      console.error('PasarGuard reset traffic error:', error);
      throw error;
    }
  }

  /**
   * باطل کردن سابسکریپشن کاربر (revoke)
   */
  async revokeUserSubscription(username: string): Promise<PasarGuardUser> {
    const token = await this.authenticate();

    try {
      const response = await fetch(`${this.baseUrl}/api/user/${username}/revoke_sub`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to revoke user subscription: ${response.status}`);
      }

      const user: PasarGuardUser = await response.json();
      return user;
    } catch (error) {
      console.error('PasarGuard revoke subscription error:', error);
      throw error;
    }
  }
}

// Singleton instance
let pasarguardClient: PasarGuardClient | null = null;

export function getPasarGuardClient(): PasarGuardClient {
  if (!pasarguardClient) {
    const config: PasarGuardConfig = {
      url: process.env.PASARGUARD_URL || '',
      username: process.env.PASARGUARD_USERNAME || '',
      password: process.env.PASARGUARD_PASSWORD || '',
    };

    if (!config.url || !config.username || !config.password) {
      throw new Error('PasarGuard configuration is incomplete. Check environment variables.');
    }

    pasarguardClient = new PasarGuardClient(config);
  }

  return pasarguardClient;
}

export type { PasarGuardUser, CreateUserParams };
