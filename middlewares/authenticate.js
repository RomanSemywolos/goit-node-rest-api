import HttpError from "../helpers/HttpError.js";
import { findUser } from "../services/authServices.js";
import { verifyToken } from "../helpers/jwt.js";

const authenticate = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return next(HttpError(401, "Not authorized"));
  }

  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer" || !token) {
    return next(HttpError(401, "Not authorized"));
  }

  const { data, error } = verifyToken(token);
  if (error) {
    return next(HttpError(401, "Not authorized"));
  }

  const user = await findUser({ email: data.email });
  if (!user || user.token !== token) {
    return next(HttpError(401, "Not authorized"));
  }

  req.user = user;
  next();
};


export default authenticate;
