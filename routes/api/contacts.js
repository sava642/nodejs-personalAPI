const express = require('express')

const router = express.Router();
const { auth, validation } = require("../../middlewares");
const { contactSchema } = require("../../shemas");
const { updateFavorit } = require("../../shemas")
const { contacts: ctrl } = require("../../controllers");

const validateMiddleware = validation(contactSchema);
const validateFavorit = validation(updateFavorit);

router.get('/', auth, ctrl.getAll);

router.get('/:id', ctrl.getById);

router.post('/', auth, validateMiddleware, ctrl.add);

router.delete('/:id', ctrl.remove);

router.put('/:id', validateMiddleware, ctrl.updateById);

router.patch('/:id/favorite', validateFavorit, ctrl.updateStatusContact);

module.exports = router