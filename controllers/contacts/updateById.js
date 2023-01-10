const db = require("../../models/contacts");
const { NotFound } = require("http-errors");

const updateById = async (req, res, next) => {
  try {

    const { id } = req.params;
    const contactByID = await db.getContactById(id);
    if (!contactByID) {
      throw NotFound(`Not found id ${id}`);
    }

    const result = await db.updateContact(id, req.body);
    res.json({
      status: "success", 
      code: 200,
      data: {
        result
      }
    })
  } catch (error){
    next(error)
    
 }
  
}

module.exports = updateById;