import mongoose from 'mongoose';

const { Schema } = mongoose;

// Define the User Schema
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      unique: true, 
    },
    number: {
      type: String,
      required: [true, 'Phone number is required'],
      match: [/^[0-9]+$/, 'Phone number is not valid'],
    },
    address: {
      type: String,
      required: [true, 'Address is required'],
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price must be a positive number'],
    },
    startDate: {
      type: Date,
      required: [true, 'Start date is required'],
    },
    subscriptionDuration: {
      type: String,
      required: [true, 'Subscription duration is required'],
    },
    endDate: {
      type: Date,
      required: [true, 'End date is required'],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Create a Model from the schema
const User = mongoose.model('allUsers', userSchema);

export default User;
