import * as authServices from "../services/authServices.js";
import HttpError from "../helpers/HttpError.js";
import path from "node:path";
import fs from "node:fs/promises";

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

export const updateAvatar = async (req, res) => {
  const { id, avatarURL: oldAvatarURL } = req.user;
  if (!req.file) {
    throw HttpError(400, "File is required");
  }
  const tempPath = req.file.path;
  const ext = path.extname(req.file.originalname);

  const newFileName = `${id}${ext}`;
  const destDir = path.join(process.cwd(), "public", "avatars");
  const newPath = path.join(destDir, newFileName);

  if (oldAvatarURL) {
    const oldFileName = path.basename(oldAvatarURL);
    if (oldFileName !== newFileName) {
      const oldAvatarPath = path.join(destDir, oldFileName);
      try {
        await fs.unlink(oldAvatarPath);
      } catch (error) {
        console.error("Error removing old avatar:", error.message);
      }
    }
  }
  await fs.rename(tempPath, newPath);
  const newAvatarURL = `/avatars/${newFileName}`;
  await authServices.updateUser({ id }, { avatarURL: newAvatarURL });
  res.status(200).json({ avatarURL: newAvatarURL });
};
