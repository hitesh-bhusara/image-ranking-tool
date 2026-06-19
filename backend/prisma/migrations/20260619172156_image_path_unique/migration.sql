/*
  Warnings:

  - A unique constraint covering the columns `[imagePath]` on the table `Image` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Comparison_leftImageId_rightImageId_key";

-- CreateIndex
CREATE UNIQUE INDEX "Image_imagePath_key" ON "Image"("imagePath");
