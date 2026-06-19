/*
  Warnings:

  - A unique constraint covering the columns `[leftImageId,rightImageId]` on the table `Comparison` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Comparison_leftImageId_rightImageId_key" ON "Comparison"("leftImageId", "rightImageId");
