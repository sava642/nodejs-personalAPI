const { User } = require("../../models/user");
const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res) => {
	const { path: tempUload, originalname } = req.file;
	const { _id: id } = req.user;
	const imageName = `${id}_${originalname}`;

	try {
		const rezultUpload = path.join(avatarsDir, imageName);
		await fs.rename(tempUload, rezultUpload);

		Jimp.read(rezultUpload)
			.then((img) => {
				return img.resize(250, 250).write(rezultUpload);
			})
			.catch((error) => {
				throw error;
			});

		const avatarURL = path.join("public", "avatars", imageName);

		await User.findByIdAndUpdate(req.user._id, { avatarURL });
		res.json({ avatarURL });

	} catch (error) {
		await fs.unlink(tempUload);
		throw error;
	}
};

module.exports = updateAvatar;