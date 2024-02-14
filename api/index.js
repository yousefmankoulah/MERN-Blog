import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()
import userRoute from './routes/user.route.js'
import authRoute from './routes/auth.route.js'
import cors from "cors";



mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log('Connected to MongoDB')
}).catch((err) => {
    console.log(err)
})

const app = express()
app.use(express.json())

app.use(cors());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'https://zany-adventure-vr7pwrvvvvfx6xx-5173.app.github.dev');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });
app.listen(3000, () => console.log('Listening on port 3000'))

// const allowedOrigins = ['https://zany-adventure-vr7pwrvvvvfx6xx-5174.app.github.dev/', 'https://zany-adventure-vr7pwrvvvvfx6xx-3000.app.github.dev']; // Add your allowed hosts here


//routes
app.use('/api/user', userRoute)
app.use('/api/auth', authRoute)


app.use((err, req, res, next) => {
    const errorStatus = err.statusCode || 500
    const errorMessage = err.message || 'Something went wrong'
    res.errorStatus(statusCode).json({ success: false, status: errorStatus, message: errorMessage, stack: err.stack })
})


