-- CreateTable
CREATE TABLE "Cifra" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "artist" TEXT NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "Cifra_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LikedCifras" (
    "authorId" TEXT NOT NULL,
    "likedId" TEXT NOT NULL,

    CONSTRAINT "LikedCifras_pkey" PRIMARY KEY ("authorId","likedId")
);

-- AddForeignKey
ALTER TABLE "LikedCifras" ADD CONSTRAINT "LikedCifras_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LikedCifras" ADD CONSTRAINT "LikedCifras_likedId_fkey" FOREIGN KEY ("likedId") REFERENCES "Cifra"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
