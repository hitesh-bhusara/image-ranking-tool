const prisma = require("../prisma");

async function getRandomPair() {

  const lowestCompared =
    await prisma.image.findMany({
      orderBy: {
        comparisons: "asc"
      },
      take: 20
    });

  const left =
    lowestCompared[
      Math.floor(
        Math.random() *
        lowestCompared.length
      )
    ];

  const candidates =
    await prisma.image.findMany({
      where: {
        id: {
          not: left.id
        }
      }
    });

  const right =
    candidates[
      Math.floor(
        Math.random() *
        candidates.length
      )
    ];

  return {
    left,
    right
  };
}

module.exports = {
  getRandomPair
};









// 2nd  --- working  --changed for starting phase


// const prisma = require("../prisma");

// async function getRandomPair() {

//   const images = await prisma.image.findMany();

//   if (images.length < 2) {
//     throw new Error("Need at least 2 images");
//   }

//   const left =
//     images[Math.floor(Math.random() * images.length)];

//   const candidates = images.filter(img =>
//     img.id !== left.id &&
//     Math.abs(img.rating - left.rating) <= 200
//   );

//   if (candidates.length === 0) {

//     const right =
//       images[Math.floor(Math.random() * images.length)];

//     return { left, right };
//   }

//   const right =
//     candidates[
//       Math.floor(Math.random() * candidates.length)
//     ];

//   return { left, right };
// }

// module.exports = {
//   getRandomPair
// };









// 1st

// const prisma = require("../prisma");

// async function getRandomPair() {
//   const count = await prisma.image.count();

//   if (count < 2) {
//     throw new Error("At least 2 images required");
//   }

//   const skip1 = Math.floor(Math.random() * count);
//   let skip2 = Math.floor(Math.random() * count);

//   while (skip1 === skip2) {
//     skip2 = Math.floor(Math.random() * count);
//   }

//   const left = await prisma.image.findFirst({
//     skip: skip1
//   });

//   const right = await prisma.image.findFirst({
//     skip: skip2
//   });

//   return { left, right };
// }

// module.exports = {
//   getRandomPair
// };