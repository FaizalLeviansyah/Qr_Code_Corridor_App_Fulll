import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import fileUpload from "express-fileupload";
import adminRoute from "./routes/adminRoute.js";
import videosRoute from "./routes/videosRoute.js";


const app = express();

dotenv.config({ path: './.env'})

//Parse Application/json
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use(fileUpload());
app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(adminRoute);
app.use(videosRoute);

app.listen(5000, ()=> console.log('Server Up & Running...'));