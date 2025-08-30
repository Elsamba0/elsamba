const mongo = require("mongoose");

const Schema = mongo.Schema;

const userSchema = new Schema(
    {
        name : String,
        password : String,
    }
);

const User = mongo.model("User", userSchema);

module.exports = User
