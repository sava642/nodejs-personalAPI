// const db = require("../../models/contacts");
const { NotFound } = require("http-errors");
const { Contacts } = require("../../models/contacts");

const updateById = async (req, res, next) => {
  try {

    const { id } = req.params;
    // const contactByID = await db.getContactById(id);
    const updatedContact = await Contacts.findByIdAndUpdate(id, req.body, {
      new: true,
    });;
    if (!updatedContact) {
      throw NotFound(`Not found id ${id}`);
    }
      res.json({
      status: "success", 
      code: 200,
      data: {
        updatedContact
      }
    })
  } catch (error){
    next(error)
    
 }
  
}

module.exports = updateById;