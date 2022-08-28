const express = require("express");
const userRoutes = require("./routes/userRouter");
const dotenv = require("dotenv")
const connectDB = require("./config/db.js")
const {errorHandler,notFound} = require('./middleware/errorMiddleware')

const app = express();
dotenv.config()
connectDB();
app.get('/',(req,res)=>{
	res.send("hello");
})

app.use(express.json());
app.use("/api/users",userRoutes);

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000;

app.listen(PORT,console.log("server started"));