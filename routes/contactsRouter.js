import express from "express";
import ctrlWrapper from "../decorators/ctrlWrapper.js";
import validateBody from "../decorators/validateBody.js";
import authenticate from "../middlewares/authenticate.js";

import { createContactSchema, updateContactSchema, updateStatusContactSchema } from "../schemas/contactsSchemas.js";

import {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
  updateStatusContact,
} from "../controllers/contactsControllers.js";

const contactsRouter = express.Router();

contactsRouter.use(authenticate);

contactsRouter.get("/", ctrlWrapper(getAllContacts));

contactsRouter.get("/:id", ctrlWrapper(getOneContact));

contactsRouter.delete("/:id", ctrlWrapper(deleteContact));

contactsRouter.post("/", validateBody(createContactSchema), ctrlWrapper(createContact));

contactsRouter.put("/:id", validateBody(updateContactSchema), ctrlWrapper(updateContact));

contactsRouter.patch("/:id/favorite", validateBody(updateStatusContactSchema), ctrlWrapper(updateStatusContact));

export default contactsRouter;