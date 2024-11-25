const Summarize = require("../models/summarize.model");
const mongoose = require("mongoose");

module.exports.summarize = async (req, res) => {
    try {
        const { _id, userId, content, result } = req.body;
        const id = new mongoose.Types.ObjectId(_id);

        // Tìm tài liệu summarize với userId đã cho
        let summarize = await Summarize.findOne({ _id: id });
   
        if (summarize) {
          // Nếu đã có, cập nhật content và result
          summarize.content = content;
          summarize.result = result;
          await summarize.save();
        } else {
          // Nếu chưa có, tạo mới
          summarize = new Summarize({ userId, content, result });
          await summarize.save();
        }
      } catch (err) {
         res.status(500).json({ error: err.message });
       }
};
module.exports.getSummarize = async (req, res) => {
  if (req.body.userId) {
    const userId = req.body.userId;
    const response = await Summarize.find({ userId: userId });
    res.json(response);
  }
};
module.exports.delete = async (req, res) => {
    try {
        const id = req.params.id;
  
        await Summarize.deleteOne({ _id: id})

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