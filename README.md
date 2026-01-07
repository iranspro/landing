# IransPro Landing & API 🚀

Next.js application with OTP authentication and Marzban VPN integration.

## 🏗️ Architecture

- **Framework**: Next.js 15+ (App Router)
- **Database**: PostgreSQL + Prisma ORM
- **Authentication**: JWT + TOTP (Time-based OTP)
- **VPN Panel**: PasarGuard API Integration
- **Email**: Nodemailer (SMTP)
- **Styling**: Tailwind CSS

## 📁 Project Structure

```
landing/
├── app/
│   ├── api/                    # API Routes
│   │   ├── auth/
│   │   │   ├── send-otp/       # POST - Send OTP to email
│   │   │   └── verify-otp/     # POST - Verify OTP & create subscription
│   │   └── user/
│   │       └── me/             # GET - Get user info (authenticated)
│   ├── guide/                  # Setup guides
│   └── page.tsx               # Landing page
├── lib/
│   ├── email.ts               # Email service (Nodemailer)
│   ├── jwt.ts                 # JWT helpers
│   ├── pasarguard.ts          # PasarGuard API client
│   ├── prisma.ts              # Prisma client
│   ├── rate-limit.ts          # Rate limiting logic
│   └── totp.ts                # TOTP generation/verification
└── prisma/
    └── schema.prisma          # Database schema
```

## 🚀 Quick Start

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Setup Environment Variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

**Required variables:**

```env
# Database
DATABASE_URL="postgresql://admin:password@localhost:5432/iranspro"

# PasarGuard
PASARGUARD_URL="http://localhost:8000"
PASARGUARD_USERNAME="admin"
PASARGUARD_PASSWORD="admin"

# Email (SMTP)
SMTP_HOST="smtp.titan.email"
SMTP_PORT=587
SMTP_USER="your-email@domain.com"
SMTP_PASS="your-password"
EMAIL_FROM="IransPro <noreply@domain.com>"

# Security (generate random secrets)
OTP_MASTER_SECRET="$(openssl rand -base64 32)"
JWT_SECRET="$(openssl rand -base64 64)"

# App
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 3. Setup Database

```bash
# Generate Prisma client
pnpm prisma generate

# Run migrations
pnpm prisma migrate dev

# (Optional) Open Prisma Studio
pnpm prisma studio
```

### 4. Run Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000)

## 📡 API Endpoints

### Authentication

**POST /api/auth/send-otp**
```json
// Request
{ "email": "user@example.com" }

// Response
{
  "success": true,
  "message": "کد تایید به ایمیل شما ارسال شد",
  "expiresIn": 60,
  "remaining": 2
}
```

**POST /api/auth/verify-otp**
```json
// Request
{ 
  "email": "user@example.com",
  "code": "123456"
}

// Response
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "...",
    "email": "user@example.com",
    "subscription": {
      "url": "vmess://...",
      "status": "active",
      "dataLimit": "10737418240",
      "dataUsed": "0",
      "expiryDate": "2026-02-07T..."
    }
  }
}
```

### User

**GET /api/user/me**  
Headers: `Authorization: Bearer <token>`

```json
// Response
{
  "user": {
    "id": "...",
    "email": "user@example.com",
    "subscription": {
      "url": "vmess://...",
      "status": "active",
      "dataLimit": "10737418240",
      "dataUsed": "524288000",
      "dataRemaining": "10212930240",
      "expiryDate": "2026-02-07T..."
    }
  }
}
```

## 🔒 Security Features

- **Rate Limiting**: Max 3 OTP requests per hour per email
- **Cooldown**: 30 seconds between OTP requests
- **TOTP**: Codes expire after 60 seconds
- **JWT**: 30-day token expiration
- **No OTP Storage**: OTPs generated on-the-fly, not stored in DB

## 🛠️ Development

```bash
# Run dev server
pnpm dev

# Build for production
pnpm build

# Run production server
pnpm start

# Type checking
pnpm tsc --noEmit

# Prisma commands
pnpm prisma studio          # Open database GUI
pnpm prisma migrate dev     # Create migration
pnpm prisma generate        # Generate Prisma Client
```

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [PasarGuard Documentation](https://docs.pasarguard.org)

## 📝 Notes

- Make sure PostgreSQL and PasarGuard are running before starting the app
- Use the parent `docker-compose.yml` to run all services together
- Check [../README.fa.md](../README.fa.md) for full setup guide in Persian
