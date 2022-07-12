const { File, Product } = require('../models');

module.exports = {
  async productImageStorage(req, res) {
    const { originalname: fileName, filename: fileUrl } = req.file;
    const file = await File.create({
      fileName,
      fileUrl,
    });

    await Product.update(
      { imageId: file.id },
      { where: { id: req.body.id } },
    );
    return res.json(file);
  },
};
