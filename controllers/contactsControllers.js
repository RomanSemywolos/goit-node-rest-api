import fs from "node:fs/promises";
import path from "node:path";
import * as contactsService from "../services/contactsServices.js";
import HttpError from "../helpers/HttpError.js";

const avatarsPath = path.resolve("public", "avatars");

export const getAllContacts = async (req, res) => {
  const { id: owner } = req.user;
  const result = await contactsService.listContacts({ owner });
  res.json(result);
};

export const getOneContact = async (req, res) => {
  const { id: owner } = req.user;
  const { id } = req.params;
  const result = await contactsService.getContact({ id, owner });
  if (!result) {
    throw HttpError(404, `Contact with id=${id} not found`);
  }
  res.json(result);
};

export const deleteContact = async (req, res) => {
  const { id: owner } = req.user;
  const { id } = req.params;
  const result = await contactsService.removeContact({ id, owner });
  if (!result) {
    throw HttpError(404, `Contact with id=${id} not found`);
  }
  res.json(result);
};

export const createContact = async (req, res) => {
  const { id: owner } = req.user;
  const { name, email, phone } = req.body;
  const result = await contactsService.addContact(name, email, phone, owner);
  res.status(201).json(result);
};

export const updateContact = async (req, res) => {
  const { id: owner } = req.user;
  const { id } = req.params;
  const result = await contactsService.updateContact({ id, owner }, req.body);
  if (!result) {
    throw HttpError(404, `Contact with id=${id} not found`);
  }
  res.json(result);
};

export const updateStatusContact = async (req, res) => {
  const { id: owner } = req.user;
  const { id } = req.params;
  const { favorite } = req.body;
  const result = await contactsService.updateStatusContact(
    { id, owner },
    { favorite }
  );
  if (!result) {
    throw HttpError(404, `Contact with id=${id} not found`);
  }
  res.json(result);
};
