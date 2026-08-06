/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Evento` table. All the data in the column will be lost.
  - You are about to drop the column `nomeCliente` on the `Evento` table. All the data in the column will be lost.
  - You are about to drop the column `tipoServico` on the `Evento` table. All the data in the column will be lost.
  - Added the required column `barbeiroId` to the `Evento` table without a default value. This is not possible if the table is not empty.
  - Added the required column `usuarioId` to the `Evento` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Usuario" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Barbeiro" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "especialidade" TEXT NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Evento" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "startTime" DATETIME NOT NULL,
    "endTime" DATETIME NOT NULL,
    "usuarioId" TEXT NOT NULL,
    "barbeiroId" TEXT NOT NULL,
    CONSTRAINT "Evento_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Evento_barbeiroId_fkey" FOREIGN KEY ("barbeiroId") REFERENCES "Barbeiro" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Evento" ("endTime", "id", "startTime") SELECT "endTime", "id", "startTime" FROM "Evento";
DROP TABLE "Evento";
ALTER TABLE "new_Evento" RENAME TO "Evento";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");
