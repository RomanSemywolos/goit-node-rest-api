import express from "express";
import ctrlWrapper from "../decorators/ctrlWrapper.js";
import validateBody from "../decorators/validateBody.js";

import { createContactSchema, updateContactSchema } from "../schemas/contactsSchemas.js";

import {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
} from "../controllers/contactsControllers.js";

const contactsRouter = express.Router();

contactsRouter.get("/", ctrlWrapper(getAllContacts));

contactsRouter.get("/:id", ctrlWrapper(getOneContact));

contactsRouter.delete("/:id", ctrlWrapper(deleteContact));

contactsRouter.post("/", validateBody(createContactSchema), ctrlWrapper(createContact));

contactsRouter.put("/:id", validateBody(updateContactSchema), ctrlWrapper(updateContact));

export default contactsRouter;