const prisma = require("../prisma");

exports.uploadImage = async (req, res) => {

  try {

    const image = await prisma.image.create({

      data: {
        imagePath: req.file.filename
      }

    });

    res.status(201).json({
      success: true,
      image
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};


exports.bulkUploadImages = async (req, res) => {

  try {

    const imageData = req.files.map(file => ({
      imagePath: file.filename
    }));

    await prisma.image.createMany({
      data: imageData
    });

    res.status(201).json({
      success: true,
      uploaded: req.files.length
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};