import { Router } from "express";
import { loginGoogle } from "../controller/users_google";
import {
  login,
  register,
  updateName,
  updatePassword,
} from "../controller/users";

// MiddleWares
import isRegisteredUser from "../middlewares/isRegisteredUser";
import AuthToken from "../middlewares/auth";

const router = Router();

router.post("/login/google", loginGoogle);
router.post("/register", isRegisteredUser, register);
router.post("/login", login);
// router.update("/name/google",)
router.put("/name/", AuthToken, updateName);
router.put("/password", AuthToken, updatePassword);

export default router;
