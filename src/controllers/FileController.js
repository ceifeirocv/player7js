const { File } = require('../models');

module.exports = {
  async productImageStorage(req, res) {
    const { originalname: fileName, filename: fileUrl } = req.file;

    const file = await File.create({
      fileName,
      fileUrl,
    });
    return res.json(file);
  },
};
