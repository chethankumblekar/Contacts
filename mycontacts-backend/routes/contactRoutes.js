const express = require("express");
const router = express.Router();
const {
  getContacts,
  createContact,
  updateContact,
  DeleteContact,
  GetContact,
} = require("../controllers/contactController");
const validateToken = require("../middleware/validateTokenHandler");

router.use(validateToken);
router.route("/").get(getContacts).post(createContact);
router.route("/:id").put(updateContact).delete(DeleteContact).get(GetContact);

module.exports = router;
