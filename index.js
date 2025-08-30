const express = require("express");
const mongo = require("mongoose");
const User = require("./moduls/user");

mongo.
    connect(
        "mongodb+srv://elsamba:Ahmedd670Data@users.vhwh84s.mongodb.net/?retryWrites=true&w=majority&appName=Users"
        )
    .then(() => {
        console.log("Connected successfully");
    })
    .catch((error) => {
        console.log("error eith connecting with the DB", error);
    })

const app = express();
app.use(express.json());
const port = process.env.PORT || 5500;

//mongodb+srv://elsamba:<db_password>@users.vhwh84s.mongodb.net/?retryWrites=true&w=majority&appName=Users


app.post("/name", (req,res) => {
    res.send(`name is ${req.body.name} , and age is ${req.query.age}`);
})

app.get("/number", (req, res) => {
    res.render(__dirname + "/views/number.ejs", {
        name : req.body.name,
    });
})

app.post("/add", async (req, res) => {
    let Users = new User(); 
    Users.name = req.body.name;
    Users.password = req.body.password;
    await Users.save();

    res.send("Saved");
})

app.get("/get", async (req,res) => {
    const Userf = await User.find();
    res.json(Userf);
})

app.get("/findId", async (req, res) => {
    const id = req.body.id;
    const Userf =  await User.findById(id);
    res.json(Userf);
})

app.delete("/delteId", async(req,res) => {
    const id = req.body.id;
    const Userf =  await User.findByIdAndDelete(id);
    res.json(Userf);
})

app.get("/showUsers", async (req, res) => {
    const Userf = await User.find();
    res.render("UserShow.ejs", {
        users : Userf
    })
})

app.listen(port , () => {
    console.log("The server is start at server " + port);
});