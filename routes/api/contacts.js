const express = require('express')
const db = require("../../models/contacts")
const { NotFound } = require("http-errors");
const Joi = require("joi");
const router = express.Router();

const contactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),

});

router.get('/', async (req, res, next) => {
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
})

router.get('/:contactId', async (req, res, next) => {
  try {
    
    const { contactId } = req.params;
    const result = await db.getContactById(contactId);

    if (!result) {
      throw new NotFound(`Contact with id=${contactId} not found`)
    }
    res.json({
      status: "succes", 
      code: 200,
      data: {
        result: result
      }
  });
    } catch (error) {
      next(error);
   }
  
});


router.post('/', async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      error.status = 400;
      throw error;
    }
    const result = await db.addContact(req.body);
    res.status(201).json({
      status: "succes",
      code: 201,
      data: {
        result
      }
    })
  } catch (error) {
    next(error); 
 }
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await db.removeContact(contactId);
    if (!result) {
      throw new NotFound(`Contact with id=${contactId} not found`)
    }
    res.json({
      status: "success", 
      code: 200,
      "message": "product deleted",
      data: {
        result
      }
    })

  } catch {
    
  }
})

router.put('/:contactId', async (req, res, next) => {
  try {
   const { error } = contactSchema.validate(req.body);
    if (error) {
      error.status = 400;
      throw error;
    }
    const { contactId } = req.params;
    const contactByID = await db.getContactById(contactId);
    if (!contactByID) {
      throw createError(404, `Invalid contact id ${contactId}`);
    }

    const result = await db.updateContact(contactId, req.body);
    res.json({
      status: "success", 
      code: 200,
      data: {
        result
      }
    })
  } catch {
    next(error);
    
 }
  
})

module.exports = router
