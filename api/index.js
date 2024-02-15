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
app.listen(3000, () => console.log('Listening on port 3000'))

app.use(cors())






//routes
app.use('/api/user', userRoute)
app.use('/api/auth', authRoute)


app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
      success: false,
      statusCode,
      message,
    });
  });


