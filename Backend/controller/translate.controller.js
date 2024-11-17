const Translate = require("../models/translate.model");
const mongoose = require("mongoose");

module.exports.translate = async (req, res) => {
    try {
        const { _id, userId, content, result } = req.body;
        const id = new mongoose.Types.ObjectId(_id);
        // Tìm tài liệu translate với userId đã cho
        let translate = await Translate.findOne({ _id: id });
    
        if (translate) {
          // Nếu đã có, cập nhật content và result
          translate.content = content;
          translate.result = result;
          await translate.save();
        } else {
          // Nếu chưa có, tạo mới
          translate = new Translate({ userId, content, result });
          await translate.save();
        }
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
};
module.exports.getTranslate = async (req, res) => {
  if (req.body.userId) {
    const userId = req.body.userId;
    const response = await Translate.find({ userId: userId });
    res.json(response);
  }
};
module.exports.delete = async (req, res) => {
    try {
        const id = req.params.id;
        await Translate.deleteOne({ _id: id})

        res.json({
            code: 200,
            message: "Xóa thành công!"
        })
    } catch(err) {
        res.json({
            code: 400,
            message: "ERROR!"
        })
    }
}