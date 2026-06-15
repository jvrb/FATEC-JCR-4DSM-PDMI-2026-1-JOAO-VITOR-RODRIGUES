/*
  Warnings:

  - Added the required column `area` to the `Curso` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Curso" ADD COLUMN     "area" TEXT NOT NULL;
