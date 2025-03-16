import { Router } from "express";
import ctrlWrapper from "../decorators/ctrlWrapper.js";
import validateBody from "../decorators/validateBody.js";
import { authSignupSchema, authSigninSchema } from "../schemas/authSchemas.js";
import { signup, signin, getCurrent, logout } from "../controllers/authController.js";
import authenticate from "../middlewares/authenticate.js"

const authRouter = Router();

authRouter.post("/register", validateBody(authSignupSchema), ctrlWrapper(signup));
authRouter.post("/login", validateBody(authSigninSchema), ctrlWrapper(signin));
authRouter.get("/current", authenticate, ctrlWrapper(getCurrent));
authRouter.post("/logout", authenticate, ctrlWrapper(logout));
export default authRouter;
