const UserModel = require("../Models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const signup = async (req, res) => {
    try{
        const { name, email, password} = req.body;
        console.log(name, email, password);
        const user = await UserModel.findOne({email});
        if(user){
            return res.status(409)
            .json({message: "User already exists, you can login", success : false});
        }
        const userModel = new UserModel({name, email, password});
        userModel.password = await bcrypt.hash(password, 10);
        await userModel.save();
        res.status(201)
        .json({
            message: "User created successfully", 
            success : true
        });
    } catch(err){
        res.status(500)
        .json({
            message: "Internal server error",
            success: false
        })
    }
}

const login = async (req, res) => {
    try{
        console.log("Login request received");
        const { email, password} = req.body;
        console.log(email, password);
        const user = await UserModel.findOne({email});
        if(!user){
            return res.status(403)
            .json({message: "User does not exist", success : false});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(403)
            .json({message: "Invalid credentials", success : false});
        }
        const jwtToken = jwt.sign(
            {email: user.email, _id: user._id}, 
            process.env.JWT_SECRET, 
            {expiresIn: '24h'}
        );
        res.status(200)
        .json({
            message: "Login successful", 
            email: user.email,
            name: user.name,
            success : true,
            jwtToken: jwtToken
            
        });
    } catch(err){
        res.status(500)
        .json({
            message: "Internal server error",
            success: false
        })
    }
}


module.exports = {
    signup,
    login
}