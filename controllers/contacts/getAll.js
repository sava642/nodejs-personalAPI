const db = require("../../models/contacts");

const getAll = async (req, res, next) => {
  try {
    const contact = await db.listContacts();
    res.json({
      status: "succes",  
      code: 200,
      data: {
      rezult: contact
    }
});
  } catch (error) {
    next(error);
  
  }
}

module.exports = getAll;