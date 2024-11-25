import mongoose from "mongoose";

// MongoDB connection URI
const MONGO_URI = "mongodb+srv://shivamGond:Mmfdv2UuHK9LVAjS@cluster0.y7agcqc.mongodb.net/Intern"; // Replace with your DB name



// Connect to MongoDB with retry logic
// Connect to MongoDB with retry logic
const connectDB = async (retries = 5, delay = 3000) => {
  let attempts = 0;

  while (attempts < retries) {
    try {
      await mongoose.connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds instead of hanging
      });
      console.log("MongoDB connected successfully!");
      return; // Exit the loop on successful connection
    } catch (error) {
      attempts++;
      console.error(
        `MongoDB connection failed (Attempt ${attempts}/${retries}): ${error.message}`
      );
      if (attempts < retries) {
        console.log(`Retrying in ${delay / 1000} seconds...`);
        await new Promise((resolve) => setTimeout(resolve, delay));
      } else {
        console.error("MongoDB connection failed after all retries.");
        process.exit(1); // Exit the process with failure
      }
    }
  }
}

export default connectDB;
