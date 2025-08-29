/*
  Warnings:

  - Added the required column `method` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."BookingMethod" AS ENUM ('ONLINE', 'OFFLINE');

-- AlterTable
ALTER TABLE "public"."Booking" ADD COLUMN     "method" "public"."BookingMethod" NOT NULL;
