const mongoose = require('mongoose')

const connectDB =async () =>{
	try{
       const conn = await mongoose.connect(process.env.MONGO_URI,{
       	useUnifiedTopology:true,
       	useNewUrlParser:true,
       })
       console.log("database connected");
	}
	catch(error){
       console.error(error.message)
       process.exit()
	}
}

module.exports = connectDB;