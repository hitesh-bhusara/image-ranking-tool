const prisma = require("../prisma");

exports.leaderboard = async (req, res) => {
  try {

    const images = await prisma.image.findMany({
      orderBy: {
        rating: "desc"
      }
    });

    res.json(images);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};