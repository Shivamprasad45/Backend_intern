import connectDB from "../Connection/DBconn.js";
import User from "../Schema/UserloginSchema.js";
import bcrypt from "bcrypt"; // For password hashing


export const UserCont__l = async (req, res) => {
  await connectDB();

  try {
    const { userName, password, email } = req.body;

    // Validate input
    if (!userName || !password || !email) {
      return res.status(200).json({ error: "Username, password, and email are required." });
    }

    // Check if the user already exists (either by email or username)
    const userWithEmail = await User.findOne({ email });
    if (userWithEmail) {
      return res.status(200).json({ error: "Email already exists." });
    }

    const userWithUserName = await User.findOne({ userName });
    if (userWithUserName) {
      return res.status(200).json({ error: "Username already exists." });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      email,
      userName,
      password: hashedPassword,
    });

    await newUser.save();

    return res.status(201).json({ message: "User created successfully." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};



export const UserCont__Log = async (req, res) => {
  await connectDB()
   try {
     const {userName,password} = req.body;
     
 
     
     // Validate input
     if (!userName || !password ) {
       return res.status(200).json({ error: "Username and password ,email are required." });
     }
 
     // Check if the user already exists
     const userWithEmail = await User.findOne({ userName });
 
     if (userWithEmail) {

const isMatch_password =await bcrypt.compare(password, userWithEmail.password )

      
if (userWithEmail.userName===userName && isMatch_password) {  
return res.status(200).json({ message:"Login successfully",Data:userWithEmail.userName})
}else{
  return res.status(200).json({ error:"email or password do not match"})
}
}

   } catch (error) {
   
     res.status(500).json({  error: error.message });
   }
 };