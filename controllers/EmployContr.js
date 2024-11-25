import connectDB from "../Connection/DBconn.js";
import Employee from "../Schema/EmploySchema.js";

export const _Employ = async (req, res) => {
    await connectDB()
     try {

    
       const {name,email,mobileNo,designation,gender,course,imgUpload} = req.body;
   
       
       // Validate input
       if (!name || !email || !mobileNo || !designation || !gender || !course || !imgUpload) {
         return res.status(200).json({ error: "All fields  are required." });
       }
   
      const isExist = await Employee.findOne({email})
      console.log(isExist ,"found")
       if(isExist !== null ){
console.log("ok")
         return res.status(200).json({ message: "Email already exists." });
       }
       // Check if the user already exists
       const newUser = new Employee({
        name,email,mobileNo,designation,gender,course,imgUpload
      });

  
      await newUser.save();
       
   return res.status(200).json({ message: "Employ create successful" });
  

  
     } catch (error) {
       console.error(error);
       res.status(500).json({ error: error.message });
     }
   };

 export const Update_Employ = async (req, res) => {
    await connectDB()
     try {

     
       const { _id,name,email,mobileNo,designation,gender,course,imgUpload} = req.body;
        // Validate input
       // Check if the user already exists
   
    await Employee.findByIdAndUpdate(_id, {
        name,email,mobileNo,designation,gender,course,imgUpload
      }, { new: true });
       
   return res.status(200).json({ message: "Employ Update successfully" });
  

  
     } catch (error) {
       console.error(error);
       res.status(500).json({ message: "An error occurred.", error: error.message });
     }
   };

   export const Delete_Employ = async (req, res) => {
    await connectDB()
  
     try {  
       const { _id} = req.body;    
       // Validate input
       // Check if the user already exists
      await Employee.findByIdAndDelete(_id)
       
   return res.status(200).json({ message: "Employ Delete  successfully" });
  
     } catch (error) {
       console.error(error);
       res.status(500).json({ message: "An error occurred.", error: error.message });
     }
   };

   export const All_Employ = async (req, res) => {
    await connectDB().catch(err => console.error("Database Connection Error:", err));
  
    const pageNumber = Number(req.query.page) || 1; // Accept page number as a query parameter
    const limitNumber = Number(req.query.limit) || 10; // Accept limit as a query parameter
    const searchQuery = req.query.search || ""; // Get the search term from the query parameters
  
   
  
    try {
      // Create a dynamic search filter
      const searchFilter = searchQuery
        ? {
            $or: [
              { name: { $regex: searchQuery, $options: "i" } }, // Search by name (case-insensitive)
              { email: { $regex: searchQuery, $options: "i" } }, // Search by email
              { designation: { $regex: searchQuery, $options: "i" } }, // Search by designation
            ],
          }
        : {}; // If no search query, return all
  
      
  
      // Get total count of employees matching the filter
      const totalEmployees = await Employee.countDocuments(searchFilter);
  
  
      // Fetch paginated data matching the filter
      const All_Emplo = await Employee.find(searchFilter)
        .skip((pageNumber - 1) * limitNumber)
        .limit(limitNumber);
  
      // Calculate total pages
      const Totalpages = Math.ceil(totalEmployees / limitNumber);
  
      // Respond with paginated data and metadata
      return res.status(200).json({
        data: All_Emplo,
        totalEmployees,
        totalPages: Totalpages,
        currentPage: pageNumber,
        limit: limitNumber,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "An error occurred.", error: error.message });
    }
  };
  