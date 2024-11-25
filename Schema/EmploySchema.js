import mongoose from 'mongoose'

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"], // Required field with a custom error message
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"], // Required field
  // Ensures no duplicate emails
    match: [/.+\@.+\..+/, "Invalid email format"], // Regex to validate email format
  },
  mobileNo: {
    type: String,
    required: [true, "Mobile number is required"],
    match: [/^\d{10}$/, "Mobile number must be 10 digits"], // Regex for numeric validation
  },
  designation: {
    type: String,
    enum: ["HR", "Manager", "Sales"], // Dropdown validation
    required: [true, "Designation is required"],
  },
  gender: {
    type: String,
    enum: ["M", "F"], // Radio button validation
    required: [true, "Gender is required"],
  },
  course: {
    type: [String], // Array to store multiple course selections
    enum: ["MCA", "BCA", "BSC"], // Checkbox validation
    required: [true, "At least one course must be selected"],
  },
  imgUpload: {
    type: String,
    required: [true, "Image upload is required"],
    match: [/\.jpg$|\.png$/i, "Only JPG or PNG files are allowed"], // Regex to validate file extensions
  },
  createDate:{
    type: Date,
    default: Date.now, // Automatically set to current date
  }
});

const Employee = mongoose.model("Employee", employeeSchema);

export default Employee;
