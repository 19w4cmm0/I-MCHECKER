const User = require("../models/user.model");

module.exports.getUser = async (req, res) => {
    try {
        const token = req.body.tokenUser;
        const resUser = await User.findOne({ tokenUser: token});
        res.json(resUser);
    } catch(err) {
        console.log("err")
        res.json(err);
    }
}