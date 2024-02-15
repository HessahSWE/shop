// Importing bcrypt for password hashing
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';

// Define the attributes that a user should have
interface UserAttrs {
  email: string;
  password: string;
}

// Define the interface for the User Model, extending mongoose.Model
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

// Define the interface for the User Document, extending mongoose.Document
interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
}

// Define the schema for the User
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Middleware to hash the password before saving
userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

// Define a static method called 'build' which creates a new User document
userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

// Create the User model using the schema
const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

// Export the User model
export { User };
