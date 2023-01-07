const express = require('express')
const db = require("../../models/contacts")
const { NotFound } = require("http-errors");

const router = express.Router();
const { validation} = require("../../middlewares");
const { contactSchema } = require("../../shemas");
const { contacts: ctrl } = require("../../controllers");

const validateMiddleware = validation(contactSchema);
 
router.get('/', ctrl.getAll);

router.get('/:id', ctrl.getById);


router.post('/', validateMiddleware, ctrl.add);

router.delete('/:id', ctrl.remove);

router.put('/:id', validateMiddleware, ctrl.updateById);

module.exports = router
