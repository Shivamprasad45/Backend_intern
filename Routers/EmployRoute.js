
import express from "express";

import multer from "multer";

import { _Employ, All_Employ, Delete_Employ, Update_Employ } from "../controllers/EmployContr.js";

const Employ_route = express.Router();

const upload = multer();

Employ_route.post('/',upload.none(),_Employ).put('/',upload.none(),Update_Employ).delete('/',upload.none(),Delete_Employ).get('/',upload.none(),All_Employ)

export default  Employ_route;