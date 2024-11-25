import mongoose from "mongoose";

// Create a User schema
const UserSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    
    required: true, // Password is required
  },
  password: {
    type: String,
    required: true, // Password is required
  },
  createdAt: {
    type: Date,
    default: Date.now, // Automatically set to current date
  },
});

// Create and export the User model
const User = mongoose.model('User', UserSchema);

export default User;
