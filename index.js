import express from 'express';
import cors from 'cors'; // Import the CORS middleware
import userRouter from './Routers/userRouter.js';
import Employ_route from './Routers/EmployRoute.js';

const app = express();

// Enable CORS for all origins
app.use(cors({
    origin: '*', // Replace with your frontend URL
    methods: ['GET', 'POST' ,'PUT',"DELETE"], // Allowed methods
    credentials: true // If you need cookies or credentials
  }));

// Middleware to parse JSON request bodies
app.use(express.json());

// Define routes
app.use("/user", userRouter);
app.use('/Empl', Employ_route);

app.get('/', function(req, res) {
  res.send(JSON.stringify("hello"));
});



// Start the server
app.listen(8080, function() {
  console.log("app listening on port 8080");
});
