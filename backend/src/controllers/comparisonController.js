

const prisma = require("../prisma");

const {
  getRandomPair
} = require("../services/pairService");

const {
  updateRatings
} = require("../services/eloService");

exports.getPair = async (req, res) => {

  try {

    const pair = await getRandomPair();

    res.json(pair);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};

exports.vote = async (req, res) => {

  try {

    const {
      leftImageId,
      rightImageId,
      result
    } = req.body;

    const left = await prisma.image.findUnique({
      where: {
        id: leftImageId
      }
    });

    const right = await prisma.image.findUnique({
      where: {
        id: rightImageId
      }
    });

    if (!left || !right) {
      return res.status(404).json({
        message: "Image not found"
      });
    }

    const ratings = updateRatings(
      left.rating,
      right.rating,
      result
    );

    await prisma.comparison.create({
      data: {
        leftImageId,
        rightImageId,
        result
      }
    });

    if (result === "LEFT") {

      await prisma.image.update({
        where: { id: left.id },
        data: {
          rating: ratings.leftRating,
          wins: {
            increment: 1
          }
        }
      });

      await prisma.image.update({
        where: { id: right.id },
        data: {
          rating: ratings.rightRating,
          losses: {
            increment: 1
          }
        }
      });

    }
    else if (result === "RIGHT") {

      await prisma.image.update({
        where: { id: left.id },
        data: {
          rating: ratings.leftRating,
          losses: {
            increment: 1
          }
        }
      });

      await prisma.image.update({
        where: { id: right.id },
        data: {
          rating: ratings.rightRating,
          wins: {
            increment: 1
          }
        }
      });

    }
    else {

      await prisma.image.update({
        where: { id: left.id },
        data: {
          rating: ratings.leftRating,
          draws: {
            increment: 1
          }
        }
      });

      await prisma.image.update({
        where: { id: right.id },
        data: {
          rating: ratings.rightRating,
          draws: {
            increment: 1
          }
        }
      });

    }

    res.json({
      success: true
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message
    });

  }
};