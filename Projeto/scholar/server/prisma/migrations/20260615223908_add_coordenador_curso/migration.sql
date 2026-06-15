/*
  Warnings:

  - You are about to drop the column `name` on the `Aluno` table. All the data in the column will be lost.
  - Added the required column `nome` to the `Aluno` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Aluno" DROP COLUMN "name",
ADD COLUMN     "nome" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Curso" ADD COLUMN     "coordenadorId" TEXT;

-- AddForeignKey
ALTER TABLE "Curso" ADD CONSTRAINT "Curso_coordenadorId_fkey" FOREIGN KEY ("coordenadorId") REFERENCES "Professor"("id") ON DELETE SET NULL ON UPDATE CASCADE;
