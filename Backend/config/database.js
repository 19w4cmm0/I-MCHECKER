const mongoose = require("mongoose");

module.exports.connect = async () => {
    try{
        await mongoose.connect('mongodb+srv://Faugust:582YYGv17ESkajAB@faugust.t1hqjr2.mongodb.net/checker');
        console.log("Connect success!")
    } catch(error){
        console.log("Connect Error!")
    }
}