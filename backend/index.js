const express = require("express");
const mongoose = require('mongoose');
const jwt = require("jsonwebtoken")
const dotenv = require('dotenv').config();

const { User } = require('./db/db')
const app = express();


mongoose.connect(process.env.MONGODB_URL)
.then(() => 
   console.log("Database is Connected")
)
.catch((err) => 
    console.log("Database is not Connected", err)
)

app.use(express.json());


app.post('/signup', async (req,res) => {
    
     try{
        const {username, password} = req.body;

        const user = await User.create({
            username,
            password
        })

        res.status(200).json({
            message : "User created Successfully",
            user : user
        })

     }
     catch(e){
        res.status(400).json({
            message : "Something went wrong",
            error : e.message
        })
     }


})

app.post("/signin", async (req,res) => {
    try{
        const {username, password} = req.body;

        const user = await User.findOne({username : username});

        if(!user){
            res.status(400).json({
                message : "User is not available"
            })
        }

        const token = await jwt.sign({id : user._id, username : username, password : password}, "SECRET_KEY", {expiresIn : "1h"})

        res.status(200).json({
            message : "Login Successfully",
            token : token
        })

    }catch(e){
        res.status(400).json({
            message : "Something went wrong",
            error : e.message
        })
    }
})

app.get("/user", async (req, res) => {
    try {
       const token = req.header('Authorization').split(" ")[1]

       if(!token){
            return res.status(400).json({ message: "Access denied. No token provided." });
       }

       const decode = await jwt.verify(token, "SECRET_KEY");

       const user = await User.findById(decode.id).select("-password") // When you prefix a field name with a hyphen, it tells Mongoose to exclude that field from the returned document.
       
       if(!user){
        return res.status(404).json({ message: 'User not found' });
       }

       res.status(200).json(user)

    } catch (e) {
        res.status(400).json({
            message: "Something went wrong",
            error: e.message
        });
    }
});

app.listen(8000, () => {
    console.log("Server is running  at 8000")
})