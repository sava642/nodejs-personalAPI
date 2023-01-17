
const { NotFound } = require("http-errors");
const { Contacts } = require("../../models/contacts");

const remove = async (req, res, next) => {
  try {
    const { id }  = req.params;
    const result = await Contacts.findById(id);
    if (!result) {
      throw new NotFound(`Contact with id=${id} not found`)
     
    }
     await Contacts.findByIdAndRemove(id);
    res.json({ 
      status: "success", 
      code: 200,
      "message": "Contact deleted",
      data: {
        result
      }
    })

  } catch (error){
    next(error)
  }
}

module.exports = remove;