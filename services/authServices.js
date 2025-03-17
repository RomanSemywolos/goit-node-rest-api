import gravatar from "gravatar";
import User from "../db/models/User.js";
import bcrypt from "bcrypt";
import { nanoid } from "nanoid";

import HttpError from "../helpers/HttpError.js";

import { createToken } from "../helpers/jwt.js";
import sendEmail from "../helpers/sendEmail.js";

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";

const createVerifyEmail = (email, verificationToken) => {
  return {
    to: email,
    subject: "Verify email",
    html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${verificationToken}">Click verify email</a>`,
  };
};

export const findUser = (query) =>
  User.findOne({
    where: query,
  });

export const updateUser = async (query, data) => {
  const user = await findUser(query);
  if (!user) return null;
  return user.update(data, {
    returning: true,
  });
};

export const signupUser = async (payload) => {
  const { email, password } = payload;
  const user = await User.findOne({
    where: {
      email,
    },
  });
  if (user) {
    throw HttpError(409, "Email in use");
  }
  const avatarURL = gravatar.url(email, { s: "250" }, true);
  const hashPassword = await bcrypt.hash(password, 10);
  const verificationToken = nanoid();
  const newUser = await User.create({
    ...payload,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });
  const verifyEmail = createVerifyEmail(email, verificationToken);
  await sendEmail(verifyEmail);
  return newUser;
};

export const verifyUser = async (verificationToken) => {
  const user = await findUser({ verificationToken });
  if (!user) {
    throw HttpError(404, "User not found");
  }
  return user.update(
    { verificationToken: null, verify: true },
    {
      returning: true,
    }
  );
};

export const reSendVerifyEmail = async (email) => {
  const user = await findUser({ email });
  if (!user) {
    throw HttpError(404, "User not found");
  }
  if (user.verify) {
    throw HttpError(404, "Verification has already been passed");
  }
  const verifyEmail = createVerifyEmail(email, user.verificationToken);
  return sendEmail(verifyEmail);
};

export const signinUser = async (payload) => {
  const { email, password } = payload;
  const user = await User.findOne({
    where: {
      email,
    },
  });
  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }
  if (!user.verify) {
    throw HttpError(401, "Email not verify");
  }
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Email or password is wrong");
  }
  const token = createToken({ email });
  await user.update(
    { token },
    {
      returning: true,
    }
  );
  return {
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  };
};

export const logoutUser = (query) => {
  return updateUser(query, { token: null });
};
