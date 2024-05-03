// adminRoute.js
import express from "express";
import {
    loginAdmin
} from "../controllers/adminController.js";

const router = express.Router();

router.post('/admin/login', loginAdmin);

// Add other admin routes as needed

export default router;
