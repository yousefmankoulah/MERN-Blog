import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()
import userRoute from './routes/user.route.js'


mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log('Connected to MongoDB')
}).catch((err) => {
    console.log(err)
})

const app = express()
//routes
app.use('/api/user', userRoute)


app.listen(3000, () => console.log('Listening on port 3000'))