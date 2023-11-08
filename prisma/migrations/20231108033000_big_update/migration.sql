/*
  Warnings:

  - You are about to drop the column `artist` on the `Cifra` table. All the data in the column will be lost.
  - You are about to drop the `Collection` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CollectionCifras` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `artistId` to the `Cifra` table without a default value. This is not possible if the table is not empty.
  - Added the required column `authorId` to the `Cifra` table without a default value. This is not possible if the table is not empty.
  - Added the required column `genreId` to the `Cifra` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Collection" DROP CONSTRAINT "Collection_authorId_fkey";

-- DropForeignKey
ALTER TABLE "CollectionCifras" DROP CONSTRAINT "CollectionCifras_cifraId_fkey";

-- DropForeignKey
ALTER TABLE "CollectionCifras" DROP CONSTRAINT "CollectionCifras_collectionId_fkey";

-- AlterTable
ALTER TABLE "Cifra" DROP COLUMN "artist",
ADD COLUMN     "artistId" TEXT NOT NULL,
ADD COLUMN     "authorId" TEXT NOT NULL,
ADD COLUMN     "genreId" TEXT NOT NULL;

-- DropTable
DROP TABLE "Collection";

-- DropTable
DROP TABLE "CollectionCifras";

-- CreateTable
CREATE TABLE "Genre" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Genre_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contributed" (
    "contributorId" TEXT NOT NULL,
    "cifraId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "CollectionsCifras" (
    "collectionId" TEXT NOT NULL,
    "cifraId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Collections" (
    "id" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,

    CONSTRAINT "Collections_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Curtidas" (
    "userId" TEXT NOT NULL,
    "cifraId" TEXT,
    "comentarioId" TEXT
);

-- CreateTable
CREATE TABLE "Comentarios" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "cifraId" TEXT NOT NULL,
    "comentarioPaiId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Comentarios_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Contributed_contributorId_cifraId_key" ON "Contributed"("contributorId", "cifraId");

-- CreateIndex
CREATE UNIQUE INDEX "CollectionsCifras_collectionId_key" ON "CollectionsCifras"("collectionId");

-- CreateIndex
CREATE UNIQUE INDEX "Curtidas_userId_key" ON "Curtidas"("userId");

-- AddForeignKey
ALTER TABLE "Cifra" ADD CONSTRAINT "Cifra_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cifra" ADD CONSTRAINT "Cifra_genreId_fkey" FOREIGN KEY ("genreId") REFERENCES "Genre"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contributed" ADD CONSTRAINT "Contributed_contributorId_fkey" FOREIGN KEY ("contributorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contributed" ADD CONSTRAINT "Contributed_cifraId_fkey" FOREIGN KEY ("cifraId") REFERENCES "Cifra"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CollectionsCifras" ADD CONSTRAINT "CollectionsCifras_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "Collections"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CollectionsCifras" ADD CONSTRAINT "CollectionsCifras_cifraId_fkey" FOREIGN KEY ("cifraId") REFERENCES "Cifra"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Collections" ADD CONSTRAINT "Collections_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Curtidas" ADD CONSTRAINT "Curtidas_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Curtidas" ADD CONSTRAINT "Curtidas_cifraId_fkey" FOREIGN KEY ("cifraId") REFERENCES "Cifra"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Curtidas" ADD CONSTRAINT "Curtidas_comentarioId_fkey" FOREIGN KEY ("comentarioId") REFERENCES "Comentarios"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comentarios" ADD CONSTRAINT "Comentarios_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comentarios" ADD CONSTRAINT "Comentarios_cifraId_fkey" FOREIGN KEY ("cifraId") REFERENCES "Cifra"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
