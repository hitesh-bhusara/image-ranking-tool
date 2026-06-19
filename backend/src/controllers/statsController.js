const prisma = require("../prisma");

exports.getStats = async (req, res) => {

  const imageCount = await prisma.image.count();

  const comparisonCount =
    await prisma.comparison.count();

  const mostCompared =
    await prisma.image.findFirst({
      orderBy: {
        comparisons: "desc"
      }
    });

  const leastCompared =
    await prisma.image.findFirst({
      orderBy: {
        comparisons: "asc"
      }
    });

  res.json({
    imageCount,
    comparisonCount,
    averageComparisons:
      imageCount === 0
        ? 0
        : comparisonCount * 2 / imageCount,
    mostCompared,
    leastCompared
  });
};