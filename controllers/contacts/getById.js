const { NotFound } = require("http-errors");
const { Contacts } = require("../../models/contacts");

const getById = async (req, res, next) => {
	try {

		const { id } = req.params;
		const result = await Contacts.findById(id);
		if (!result) {
			throw new NotFound(`Contact with id=${id} not found`)
		}
		res.json({
			status: "succes",
			code: 200,
			message: `Contact with id=${id} found`,
			data: {
				result: result
			}
		});
	} catch (error) {
		next(error);
	}
};

module.exports = getById;