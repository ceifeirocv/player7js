const { Product, ProductTypes } = require('../models');

module.exports = {
  async store(req, res) {
    const productExists = await Product.findOne({ where: { name: req.body.name } });
    if (productExists) return res.status(403).json({ erro: 'product alrady exists' });

    const productType = await ProductTypes.findOne({ where: { type: req.body.type } });
    if (!productType) return res.status(403).json({ erro: 'This product type soes not exists' });

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
