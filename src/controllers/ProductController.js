const { Product, ProductTypes, File } = require('../models');

module.exports = {
  async get(req, res) {
    const products = await Product.findAll({
      attributes: { exclude: ['updatedAt', 'createdAt', 'typeId', 'imageId'] },
      include: [
        {
          model: ProductTypes,
          attributes: { exclude: ['updatedAt', 'createdAt', 'id'] },
        },
        {
          model: File,
          attributes: { exclude: ['updatedAt', 'createdAt', 'id'] },
        },
      ],
    });
    return res.json(products);
  },

  async store(req, res) {
    const productExists = await Product.findOne({ where: { name: req.body.name } });
    if (productExists) return res.status(403).json({ erro: 'product alrady exists' });

    const productType = await ProductTypes.findOne({ where: { type: req.body.type } });
    if (!productType) return res.status(403).json({ erro: 'This product type does not exists' });

    const product = await Product.create({ ...req.body, typeId: productType.id });

    return res.json(product);
  },

  async update(req, res) {
    const productToUpdate = await Product.findOne({ where: { id: req.body.id } });

    if (req.body.type) {
      const productType = await ProductTypes.findOne({ where: { type: req.body.type } });
      const product = await productToUpdate.update({ ...req.body, typeId: productType.id });
      return res.json(product);
    }

    const product = await productToUpdate.update(req.body);
    return res.json(product);
  },
};
