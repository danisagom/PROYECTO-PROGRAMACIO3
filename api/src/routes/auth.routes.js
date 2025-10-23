import { Router } from "express";
import { registerUser } from "../services/registerUser.js";
import { loginUser } from "../services/loginUser.js";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

export default router;
