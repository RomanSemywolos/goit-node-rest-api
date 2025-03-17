import { Router } from "express";
import ctrlWrapper from "../decorators/ctrlWrapper.js";
import validateBody from "../decorators/validateBody.js";
import { authSignupSchema, authSigninSchema, authVerifySchema } from "../schemas/authSchemas.js";
import { signup, verify, reSendVerify, signin, getCurrent, logout, updateAvatar } from "../controllers/authController.js";
import authenticate from "../middlewares/authenticate.js"
import upload from "../middlewares/upload.js";

const authRouter = Router();

authRouter.post("/register", validateBody(authSignupSchema), ctrlWrapper(signup));

authRouter.post("/verify", validateBody(authVerifySchema), ctrlWrapper(reSendVerify));

authRouter.get("/verify/:verificationToken", ctrlWrapper(verify));
authRouter.post("/login", validateBody(authSigninSchema), ctrlWrapper(signin));
authRouter.get("/current", authenticate, ctrlWrapper(getCurrent));
authRouter.post("/logout", authenticate, ctrlWrapper(logout));
authRouter.patch("/avatars", authenticate, upload.single("avatar"), ctrlWrapper(updateAvatar));
export default authRouter;
