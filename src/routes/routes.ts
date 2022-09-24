import { Router } from "express";
import { login } from "../controller/users_google";

const router = Router();

router.post("/login/google", login);

export default router;
