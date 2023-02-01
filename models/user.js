const mongoose = require('mongoose');
const { required } = require('../shemas/contactsShema');
mongoose.set('strictQuery', false);
const Joi = require("joi");



const userSchema = mongoose.Schema(
	{
		password: {
			type: String,
			required: [true, 'Password is required'],
			minlength: 6
		},
		email: {
			type: String,
			required: [true, 'Email is required'],
			unique: true,
		},
		subscription: {
			type: String,
			enum: ["starter", "pro", "business"],
			default: "starter"
		},
		token: {
			type: String,
			default: null,
		},
		avatarURL: {
			type: String,
			required: true
		}

	},
	{ versionKey: false, timestamps: true });

const joiRegisterSchema = Joi.object({
	password: Joi.string().min(6).required(),
	email: Joi.string().required(),
})

const joiLoginSchema = Joi.object({
	password: Joi.string().min(6).required(),
	email: Joi.string().required(),
})

const User = mongoose.model("user", userSchema);

module.exports = {
	User,
	joiRegisterSchema,
	joiLoginSchema
}