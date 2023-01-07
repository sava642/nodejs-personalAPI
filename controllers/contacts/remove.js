const db = require("../../models/contacts");

const remove = async (req, res, next) => {
  try {
    const { id }  = req.params;
    const result = await db.removeContact(id);

    if (!result) {
      throw new NotFound(`Contact with id=${id} not found`)
     
    }
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