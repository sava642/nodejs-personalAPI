// const { required } = require("joi");
const { User } = require("../../models/user");
const { Unauthorized } = require("http-errors");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { SECRET_KEY } = process.env;


const login = async (req, res, next) => {
    
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            throw new Unauthorized(`Email ${email} not found`);
        }
        const passCompare = bcrypt.compareSync(password, user.password);
        if (!passCompare) {
            throw new Unauthorized(`Password is wrong`);
        }
        const payload = {
            id: user._id
        };
        const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "2h" });
        await User.findByIdAndUpdate(user._id, { token });
        res.json({
            status: "succes",
            code: 200,
            data: {
                token
            }
        })
        } catch (error){
         next(error);
    }
}

module.exports = login;