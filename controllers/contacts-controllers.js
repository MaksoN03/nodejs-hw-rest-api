const { HttpError } = require("../helpers");
const { Contact } = require("../models/contact");
const { ctrlWrapper } = require("../decorators");

const getAllContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20 } = req.query;
  const skip = (page - 1) * limit;
  const result = await Contact.find({ owner }, { skip, limit }).populate(
    "owner",
    "name email"
  );
  res.json(result);
};

const getContactById = async (req, res) => {

  const { id: owner } = req.params;
  const result = await Contact.findOne({_id: id, owner});
  if (!result) {
    throw HttpError(404, "Not Found");
  }
  res.json(result);
};

const addContact = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Contact.create({ ...req.body, owner });
  res.status(201).json(result);
};

const removeContact = async (req, res) => {

  const { id: owner } = req.params;
  const result = await Contact.findOneAndDelete({_id: id, owner});
  if (!result) {
    throw HttpError(404, "Not Found");
  }
  res.status(200).json(result);
};

const updateContactById = async (req, res) => {

  const { id: owner } = req.params;
  const result = await Contact.findOneAndUpdate({_id: id, owner}, req.body, { new: true });
  if (!result) {
    throw HttpError(404, "Not Found");
  }
  res.json(result);
};

module.exports = {
  getAllContacts: ctrlWrapper(getAllContacts),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  removeContact: ctrlWrapper(removeContact),
  updateContactById: ctrlWrapper(updateContactById)
};