import * as contactsService from "../services/contactsServices.js";
import HttpError from "../helpers/HttpError.js";

export const getAllContacts = async (req, res) => {
    const result = await contactsService.listContacts();
    res.json(result);
};

export const getOneContact = async (req, res) => {
  const { id } = req.params;
  const result = await contactsService.getContactById(id);
  if (!result) {
    throw HttpError(404, `Contact with id=${id} not found`);
  }
  res.json(result);
};

export const deleteContact = async (req, res) => {
  const { id } = req.params;
  const result = await contactsService.removeContact(id);
  if (!result) {
    throw HttpError(404, `Contact with id=${id} not found`);
  }
  res.json(result);
};

export const createContact = async (req, res) => {
  const { name, email, phone } = req.body;
  const result = await contactsService.addContact(name, email, phone);
  res.status(201).json(result);
};

export const updateContact = async (req, res) => {
  const { id } = req.params;
  const result = await contactsService.updateContact(id, req.body);
  if (!result) {
    throw HttpError(404, `Contact with id=${id} not found`);
  }
  res.json(result);
};
