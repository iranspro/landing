-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "lastOtpSent" TIMESTAMP(3),
    "otpRequestCount" INTEGER NOT NULL DEFAULT 0,
    "otpRequestsResetAt" TIMESTAMP(3),
    "marzbanUsername" TEXT,
    "subscriptionUrl" TEXT,
    "subscriptionStatus" TEXT,
    "dataLimit" BIGINT,
    "dataUsed" BIGINT NOT NULL DEFAULT 0,
    "expiryDate" TIMESTAMP(3),
    "subscriptionCreatedAt" TIMESTAMP(3),
    "lastSyncedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_marzbanUsername_key" ON "User"("marzbanUsername");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_marzbanUsername_idx" ON "User"("marzbanUsername");

-- CreateIndex
CREATE INDEX "User_subscriptionStatus_idx" ON "User"("subscriptionStatus");

-- CreateIndex
CREATE INDEX "User_expiryDate_idx" ON "User"("expiryDate");
