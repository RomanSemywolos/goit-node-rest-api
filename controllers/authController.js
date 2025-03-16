import * as authServices from "../services/authServices.js";

export const signup = async (req, res) => {
  const user = await authServices.signupUser(req.body);
  res.status(201).json({
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

export const signin = async (req, res) => {
  const result = await authServices.signinUser(req.body);
  res.json({
    token: result.token,
    user: result.user,
  });
};

export const getCurrent = async (req, res) => {
  const { email, subscription } = req.user;
  res.json({
    email,
    subscription,
  });
};

export const logout = async (req, res) => {
  const { id } = req.user;
  await authServices.logoutUser({ id });
  res.status(204).end();
};
