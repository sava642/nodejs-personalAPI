const bcrypt = require('bcrypt');
const { User } = require("../../models/user");
const { Conflict } = require("http-errors");
const gravatar = require("gravatar")

const register = async (req, res, next) => {

	try {
		const { email, password, subscription } = req.body;
		const user = await User.findOne({ email });
		if (user) {
			throw new Conflict(`Email ${email} in use`)
		}
		const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
		const avatarURL = gravatar.url(email)
		console.log(avatarURL)
		const newUser = await User.create({ email, password: hashPassword, subscription, avatarURL });
		res.status(201).json({
			status: "succes",
			code: 201,
			data: {
				newUser: {
					email,
					subscription: "starter",
					avatarURL,
				}
			}
		})
	} catch (error) {
		next(error);
	}
}

module.exports = register;