const express = require('express');
const cors = require('cors'); // Import cors
const app = express();
const database = require("./config/database");
const route = require("./routes/index.route");
const cookieParser = require('cookie-parser')

const bodyParser = require('body-parser');
const { Configuration, OpenAIApi } = require('openai');
require('dotenv').config();

// Kết nối database
database.connect();

// Sử dụng middleware để parse JSON
app.use(express.json());

// Middleware
const corsOptions = {
  origin: "http://localhost:3000", // Đặt origin cụ thể
  credentials: true, // Cho phép gửi cookie hoặc các thông tin đăng nhập
};
app.use(cors(corsOptions));
app.use(bodyParser.json());

const OpenAI = require('openai');

// Khởi tạo OpenAI API với API key
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});
// Định nghĩa route
route(app);
app.set('view engine', 'ejs');
app.set('views', './views');

app.use(cookieParser('XXXXXXXXXX'));

// Khởi chạy server
const port = 5000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
