const  asyncHandler = require("express-async-handler")
const  User = require("../models/userModel.js")
const  generateToken = require("../utils/generateToken.js")

const authUser = asyncHandler(async (req,res)=>{
	const {email,password} = req.body

	const user = await User.findOne({email});

	if(user && (await user.matchPassword(password))){
		res.json({
			id:user.id,
			name:user.name,
			email:user.email,
			isAdmin:user.isAdmin,
			age:user.age,
			token:generateToken(user.id)
		})
	}else {
		res.status(401);
		throw new Error("Invalid Email or Password")
	}
})


const registerUser = asyncHandler(async (req,res)=>{
	const {name,email,password,age} = req.body

	const userExits = await User.findOne({email});
	
    if(userExits){
    	res.status(404)
    	throw new Error("User already exist");
    }

    const user = await User.create({
    	name,
    	email,
    	password,
    	age
    })

	if(user && (await user.matchPassword(password))){
		res.status(201).json({
			id:user.id,
			name:user.name,
			email:user.email,
			isAdmin:user.isAdmin,
			age:user.age,
			token:generateToken(user.id)
		})
	}else{
		res.status(400)
		throw new Error("User Not found")
	}
})

module.exports = {authUser,registerUser}