const prisma = require("../prisma");

exports.getStats = async (req, res) => {

    try {
        const imageCount = await prisma.image.count();

        const comparisonCount =
            await prisma.comparison.count();



        res.json({
            imageCount,
            comparisonCount,
            averageComparisons:
                imageCount === 0
                    ? 0
                    : comparisonCount * 2 / imageCount,
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }

};