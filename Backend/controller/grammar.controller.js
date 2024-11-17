const Grammar = require("../models/grammar.model");
const mongoose = require("mongoose");

module.exports.grammar = async (req, res) => {
    try {
        const { _id, userId, content, result } = req.body;
        const id = new mongoose.Types.ObjectId(_id);
        // Tìm tài liệu grammar với userId đã cho
        let grammar = await Grammar.findOne({ _id: id });
    
        if (grammar) {
          // Nếu đã có, cập nhật content và result
          grammar.content = content;
          grammar.result = result;
          await grammar.save();
        } else {
          // Nếu chưa có, tạo mới
          grammar = new Grammar({ userId, content, result });
          await grammar.save();
        }
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
};
module.exports.getGrammar = async (req, res) => {
  if (req.body.userId) {
    const userId = req.body.userId;
    const response = await Grammar.find({ userId: userId });
    res.json(response);
  }
};
module.exports.delete = async (req, res) => {
    try {
        const id = req.params.id;
        await Grammar.deleteOne({ _id: id})

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