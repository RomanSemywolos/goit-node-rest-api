import Contact from "../db/models/Contact.js";

export const listContacts = (query) =>
  Contact.findAll({
    where: query,
  });

// export const getContactById = (id) => Contact.findByPk(id);

export const getContact = (query) =>
  Contact.findOne({
    where: query,
  });

export const removeContact = (query) =>
  Contact.destroy({
    where: query,
  });

export const addContact = (name, email, phone, owner, favorite) =>
  Contact.create({ name, email, phone, owner, favorite });

export const updateContact = async (query, data) => {
  const contact = await getContact(query);
  if (!contact) return null;
  return contact.update(data, {
    returning: true,
  });
};

export const updateStatusContact = async (query, { favorite }) => {
  const contact = await getContact(query);
  if (!contact) return null;
  return contact.update({ favorite });
};
