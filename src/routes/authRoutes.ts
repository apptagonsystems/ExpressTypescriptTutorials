import { Router, Request, Response } from "express";
import { loginUser, registerUser } from "../controllers/userController";

const router: Router = Router();

router.post("/login", loginUser)

router.post("/register", registerUser)

export default router;