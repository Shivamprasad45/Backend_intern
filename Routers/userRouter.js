
import express from "express";
import multer from "multer";

import { UserCont__l, UserCont__Log } from "../controllers/LoginCon.js";



const route = express.Router();

const upload = multer();

route.post('/',upload.none(),UserCont__l).put('/',upload.none(),UserCont__Log)





export default  route;