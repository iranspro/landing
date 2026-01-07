# 🚀 IransPro Deployment Guide

راهنمای کامل دیپلوی پروژه روی سرور با Docker و Traefik

---

## 📋 پیش‌نیازها

```bash
# Server Requirements
- Ubuntu 22.04 LTS (توصیه می‌شود)
- حداقل 2GB RAM
- حداقل 20GB فضای دیسک
- دامنه با دسترسی به DNS (irans.pro)
```

---

## 🔧 نصب Docker

```bash
# آپدیت سیستم
sudo apt update && sudo apt upgrade -y

# نصب Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# نصب Docker Compose
sudo apt install docker-compose-plugin -y

# افزودن کاربر به گروه docker
sudo usermod -aG docker $USER

# ری‌استارت
sudo systemctl restart docker
```

---

## 🌐 تنظیمات DNS

به پنل DNS دامنه خود بروید و این رکوردها را اضافه کنید:

```
A      @           YOUR_SERVER_IP
A      www         YOUR_SERVER_IP
A      panel       YOUR_SERVER_IP
A      traefik     YOUR_SERVER_IP
```

---

## 📦 کلون و تنظیم پروژه

```bash
# کلون پروژه
git clone https://github.com/yourusername/iranspro.git
cd iranspro/landing

# کپی environment variables
cp .env.example .env.local

# ویرایش .env.local
nano .env.local
```

### 🔐 تنظیمات مهم `.env.local`:

```bash
# Database
DATABASE_URL="postgresql://admin:STRONG_PASSWORD@postgres:5432/iranspro"
POSTGRES_USER=admin
POSTGRES_PASSWORD=STRONG_PASSWORD_HERE

# PasarGuard
PASARGUARD_URL="http://pasarguard:8000"
PASARGUARD_USERNAME="admin"
PASARGUARD_PASSWORD="STRONG_PASSWORD_HERE"

# Email (Titan/Gmail)
SMTP_HOST="smtp.titan.email"
SMTP_PORT=587
SMTP_USER="noreply@irans.pro"
SMTP_PASS="your-email-password"
EMAIL_FROM="IransPro <noreply@irans.pro>"

# Security (Generate with: openssl rand -base64 32)
OTP_MASTER_SECRET="YOUR_RANDOM_SECRET_HERE"
JWT_SECRET="YOUR_JWT_SECRET_HERE"

# Telegram Bot
TELEGRAM_BOT_TOKEN="123456789:ABCdefGHIjklMNOpqrsTUVwxyz"
TELEGRAM_CHAT_ID="-1001234567890"

# Application
NEXT_PUBLIC_APP_URL="https://irans.pro"
NODE_ENV="production"
```

---

## 🚀 اجرای پروژه

```bash
# Build و اجرای تمام سرویس‌ها
docker-compose up -d --build

# مشاهده لاگ‌ها
docker-compose logs -f

# چک کردن وضعیت
docker-compose ps
```

---

## 🎯 دسترسی به سرویس‌ها

بعد از چند دقیقه (برای صدور SSL):

- **Landing Page**: https://irans.pro
- **PasarGuard Panel**: https://panel.irans.pro
- **Traefik Dashboard**: https://traefik.irans.pro (admin:admin)

---

## 🔐 ایجاد Admin برای PasarGuard

```bash
# ورود به container
docker exec -it iranspro_pasarguard bash

# ایجاد admin
pasarguard cli admins --create admin

# خروج
exit
```

---

## 📊 Prisma Migration

```bash
# اجرای migration
docker exec iranspro_landing npx prisma migrate deploy

# مشاهده دیتابیس (optional)
docker exec iranspro_landing npx prisma studio
```

---

## 🔄 آپدیت پروژه

```bash
# Pull کردن آخرین تغییرات
git pull origin main

# Rebuild containers
docker-compose up -d --build

# حذف image های قدیمی
docker image prune -a
```

---

## 🛡️ امنیت و Backup

### Backup دیتابیس:

```bash
# Backup PostgreSQL
docker exec iranspro_postgres pg_dump -U admin iranspro > backup_$(date +%Y%m%d).sql

# Restore
cat backup_20260108.sql | docker exec -i iranspro_postgres psql -U admin iranspro
```

### Backup Volume ها:

```bash
# Backup volumes
docker run --rm \
  -v iranspro_postgres_data:/data \
  -v $(pwd):/backup \
  alpine tar czf /backup/postgres_backup.tar.gz -C /data .
```

---

## 🔍 Troubleshooting

### مشکل SSL:

```bash
# چک کردن لاگ traefik
docker logs iranspro_traefik

# حذف و ایجاد مجدد acme.json
docker-compose down
docker volume rm iranspro_traefik_letsencrypt
docker-compose up -d
```

### مشکل دسترسی به PasarGuard:

```bash
# چک کردن healthcheck
docker inspect iranspro_pasarguard | grep -A 10 Health

# ری‌استارت سرویس
docker-compose restart pasarguard
```

### مشکل دیتابیس:

```bash
# چک کردن connection
docker exec iranspro_postgres psql -U admin -d iranspro -c "SELECT 1;"

# مشاهده لاگ
docker logs iranspro_postgres
```

---

## 📈 Monitoring

### مشاهده Resource Usage:

```bash
# استفاده از منابع
docker stats

# فضای دیسک
docker system df
```

### لاگ‌های مهم:

```bash
# تمام لاگ‌ها
docker-compose logs -f

# فقط لندینگ
docker-compose logs -f landing

# فقط PasarGuard
docker-compose logs -f pasarguard
```

---

## 🔧 تنظیمات پیشرفته

### محدود کردن منابع:

```yaml
# در docker-compose.yml
services:
  landing:
    deploy:
      resources:
        limits:
          cpus: '1'
          memory: 512M
        reservations:
          memory: 256M
```

### Auto-restart policy:

```yaml
services:
  landing:
    restart: unless-stopped
```

---

## 📞 پشتیبانی

در صورت بروز مشکل:

1. لاگ‌ها را بررسی کنید
2. GitHub Issues را چک کنید
3. به کانال تلگرام مراجعه کنید

---

**🎉 موفق باشید!**
