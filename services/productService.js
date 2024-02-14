const Product = require('../models/Product');

const purchaseProduct = async (productId) => {
    const product = await Product.findById(productId);
    if (!product) {
        throw new Error('Product not found');
    }
    if (product.stockQuantity < 1) {
        throw new Error('Product is out of stock');
    }
    product.stockQuantity -= 1;
    await product.save();
    return product;
};

module.exports = {
    purchaseProduct,
};
