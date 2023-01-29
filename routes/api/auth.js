const express = require('express')
const router = express.Router();
const {auth, validation, upload} = require("../../middlewares");
const {joiRegisterSchema, joiLoginSchema} = require("../../models/user");
const { auth: ctrl } = require("../../controllers");



router.post('/register', validation(joiRegisterSchema), ctrl.register);

router.post('/login', validation(joiLoginSchema), ctrl.login);

router.get('/current', auth, ctrl.getCurrent);

router.get('/logout', auth, ctrl.logout);

router.patch("/avatars", auth, upload.single("avatar"), ctrl.updateAvatar);


module.exports = router;