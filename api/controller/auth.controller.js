import User from "../models/user.model.js"
import bcryptjs from 'bcryptjs'

export const signup = async (req, res) => {
    const { username, email, password } = req.body

    if (!username || !email || !password || username === '' || email === '' || password === '') {
        return res.status(400).json({ message: 'All fields are required' })
    }

    const hashedPassword = bcryptjs.hashSync(password, 10)

    const existingUser = await User.findOne({ email })
    if (existingUser) {
        return res.status(409).json({ message: 'User already exists' })
    }
    const newUser = new User({
        username,
        email,
        password: hashedPassword
    })
    try{
        await newUser.save()
    } catch(err){
        console.log(err)
    }
    res.status(201).json({ message: 'User created successfully' })
}