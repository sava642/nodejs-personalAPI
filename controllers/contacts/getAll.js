// const db = require("../../models/contacts");
const { Contacts } = require("../../models/contacts");

const getAll = async (req, res, next) => {
  try {
    
    const { limit } = req.query;
    const contact = await Contacts.find({}).limit(limit);
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