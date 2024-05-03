// adminController.js
import bcrypt from "bcrypt";
import Admin from "../models/adminModel.js";

export const loginAdmin = async (req, res) => {
    const { username, password } = req.body;
    try {
        const admin = await Admin.findOne({ where: { username } });
        if (!admin) return res.status(404).json({ msg: "Admin not found" });

        const isPasswordValid = await bcrypt.compare(password, admin.password);
        if (!isPasswordValid) return res.status(401).json({ msg: "Invalid password" });

        // You can use JWT or sessions for authentication and authorization
        // Set admin session or JWT token here
        res.status(200).json({ msg: "Login successful" });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: "Internal server error" });
    }
};

// You can implement other CRUD operations for admin here
