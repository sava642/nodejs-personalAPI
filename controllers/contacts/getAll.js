
const { Contacts } = require("../../models/contacts");

const getAll = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { page = 1, limit = 20} = req.query;
    const skip = (page - 1) * limit;
    const contact = await Contacts.find({ owner: _id }, "", { skip, limit: Number(limit) });
    
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