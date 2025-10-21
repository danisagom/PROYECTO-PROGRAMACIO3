import { Router } from "express";
import { registerUser } from "../services/registerUser";
import { loginUser } from "../services/loginUser";

const router = Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

export default router;
