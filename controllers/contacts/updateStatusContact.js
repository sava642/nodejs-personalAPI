const { NotFound } = require("http-errors");
const { Contact } = require("../../models/contacts");

const updateStatusContact = async (req, res, next) => {
	try {
		const { id } = req.params;
		const updatedContact = await Contact.findByIdAndUpdate(id, req.body, {
			new: true,
		});

		if (!updatedContact) {
			throw NotFound(`Not found id ${id}`);
		}
		res.json({
			status: "success",
			code: 200,
			data: {
				contact: updatedContact,
			},
		});
	} catch (error) {
		next(error);
	}
};

module.exports = updateStatusContact;