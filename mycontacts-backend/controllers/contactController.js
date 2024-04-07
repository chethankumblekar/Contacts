const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");
const constant = require("../constants");

//@desc Get All contacts
//@route GET /api/contacts
//@access private

const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({ user_id: req.user.id });
  res.status(200).json(contacts);
});

//@desc Create New contact
//@route POST /api/contacts
//@access private

const createContact = asyncHandler(async (req, res) => {
  const { name, details, email } = req.body;
  if (!name || details.length < 1 || !email) {
    res.status(400);
    throw new Error("All fields are manadatory");
  }
  const contact = await Contact.create({
    name: name,
    details: details,
    email: email,
    user_id: req.user.id,
  });
  res.status(201).json(contact);
});

//@desc Update contact
//@route PUT /api/contact/{id}
//@access private

const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error(
      "User does not have permission to update other users contact"
    );
  }
  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json(updatedContact);
});

//@desc Delete contact
//@route Delete /api/contact/{id}
//@access private

const DeleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error(
      "User does not have permission to delete other users contact"
    );
  }

  const val = await Contact.deleteOne({ _id: req.params.id });
  res.status(200).json(contact);
});

//@desc Get contact
//@route GET /api/contact/{id}
//@access private

const GetContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error(
      "User does not have permission to view other users contact"
    );
  }
  res.status(200).json(contact);
});

module.exports = {
  getContacts,
  createContact,
  updateContact,
  DeleteContact,
  GetContact,
};
