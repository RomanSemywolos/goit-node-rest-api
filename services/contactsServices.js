import User from "../db/models/User.js";

export const listContacts = () => User.findAll();

export const getContactById = (id) => User.findByPk(id);

export const removeContact = (id) =>
  User.destroy({
    where: {
      id,
    },
  });

export const addContact = (name, email, phone, favorite) =>
  User.create({ name, email, phone, favorite });

export const updateContact = async (id, data) => {
  const contact = await getContactById(id);
  if (!contact) return null;
  return contact.update(data, {
    returning: true,
  });
};

export const updateStatusContact = async (id, { favorite }) => {
  const contact = await User.findByPk(id);
  if (!contact) return null;
  return await contact.update({ favorite });
};