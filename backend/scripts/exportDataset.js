const fs = require("fs");
const path = require("path");

const prisma = require("../src/prisma");

async function exportDataset() {

  const images = await prisma.image.findMany({
    orderBy: {
      rating: "desc"
    }
  });

  const rows = [
    "imagePath,rating,wins,losses,draws,comparisons"
  ];

  images.forEach(img => {

    rows.push(
      `${img.imagePath},${img.rating},${img.wins},${img.losses},${img.draws},${img.comparisons}`
    );

  });

  const outputPath = path.join(
    __dirname,
    "../exports/dataset.csv"
  );

  fs.mkdirSync(
    path.join(__dirname, "../exports"),
    { recursive: true }
  );

  fs.writeFileSync(
    outputPath,
    rows.join("\n")
  );

  console.log("Dataset exported.");
}

exportDataset();