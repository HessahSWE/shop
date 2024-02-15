import mongoose from 'mongoose';

// Define the attributes that a product should have
interface ProductAttrs {
  name: string;
  description: string;
  price: number;
  stockQuantity: number;
}

// Define the interface for the Product Document, extending mongoose.Document
interface ProductDoc extends mongoose.Document {
  name: string;
  description: string;
  price: number;
  stockQuantity: number;
}

// Define the schema for the Product
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  stockQuantity: { type: Number, required: true },
}, {
  timestamps: true, // Automatically add createdAt and updatedAt fields
});

// Define a static method called 'build' which creates a new Product document
productSchema.statics.build = (attrs: ProductAttrs) => {
  return new Product(attrs);
};

// Create the Product model using the schema
const Product = mongoose.model<ProductDoc>('Product', productSchema);

// Export the Product model
export { Product };
