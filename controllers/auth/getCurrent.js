const { User } = require("../../models/user");

const getCurrent = async(req, res, next) => {
  try {
    const { subscription, email } = req.user;
    res.json({
      status: "success",
      code: 200,
      data: {
        user: {
          email,
          subscription,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getCurrent;