const User = require("../models/user.model")
const generate = require("../helpers/generate")

// [POST] /api/auth/register
module.exports.register = async (req, res) => {
    req.body.token = generate.generateRandomString(30);
    const existEmail = await User.findOne({ email: req.body.email});

    if(existEmail) {
        res.json({
            code: 400,
            message: "Email đã tồn tại!"
        })
    } else {
        const user = new User(req.body);
        user.save();
        const token = user.token;
        res.cookie("tokenUser", token);

        res.json({
            code: 200,
            message: "Đăng ký thành công!",
            tokenUser: token
        })
    }
}

// [POST] /api/auth/login
module.exports.login = async (req,res) => {
    const email = req.body.email;
    const password = req.body.password;


    const user = await User.findOne({
        email: email
    });

    if(!user) {
        res.json({
            code: 400,
            message: "Email không tồn tại!"
        });
        return;
    }
    if( password !== user.password) {
        res.json({
            code: 401,
            message: "Sai mật khẩu!"
            
        })
        return;
    }
    const token = user.tokenUser;
    const expiresTime = 1000 * 60 * 24 * 365;
        res.cookie("tokenUser", token, {
            expires: new Date(Date.now() + expiresTime),
            path: "/"
        });
    // res.cookie("tokenUser", token);

        res.json({
            email: user.email,
            code: 200,
            message: "Đăng nhập thành công!",
        });
}