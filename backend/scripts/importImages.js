const fs = require("fs");
const path = require("path");

const prisma = require("../src/prisma");

async function importImages() {

  const folder = path.join(
    __dirname,
    "../storage/images"
  );

  const files = fs.readdirSync(folder);

  let imported = 0;
  let skipped = 0;

  for (const file of files) {

    const exists = await prisma.image.findUnique({
      where: {
        imagePath: file
      }
    });

    if (exists) {
      skipped++;
      continue;
    }

    await prisma.image.create({
      data: {
        imagePath: file
      }
    });

    imported++;
  }

  console.log(`Imported: ${imported}`);
  console.log(`Skipped: ${skipped}`);

  process.exit();
}

importImages();