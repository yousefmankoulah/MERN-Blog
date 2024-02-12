import User from "../models/user.model.js"
import bcryptjs from 'bcryptjs'
import { errorHandler } from "../utilis/error.js"
import jwt from 'jsonwebtoken'

export const signup = async (req, res, next) => {
    const { username, email, password } = req.body
    
    if (!username || !email || !password || username === '' || email === '' || password === '') {
        next(errorHandler(400, 'All fields are required'))
    }

    const hashedPassword = bcryptjs.hashSync(password, 10)

    const existingUser = await User.findOne({ email })
    if (existingUser) {
        next(errorHandler(400, 'User already exists'))
    }
    const newUser = new User({
        username,
        email,
        password: hashedPassword
    })
    
    try{
        await newUser.save()
        res.json('User created successfully')

    } catch(err){
        next(err)
    }

}


export const signin = async (req, res, next) => {
    const { email, password } = req.body;

    if(!email || !password || email === '' || password === ''){
        next(errorHandler(400, 'All Fields are required'))
    }

    try{

        const validator = await User.findOne({ email })
        if(!validator){
            return next(errorHandler(400, "User not Found"))
        }
        const validpassword = bcryptjs.compareSync(password, validator.password)
        if (!validpassword){
            return next(errorHandler(400, "Invalid Password"))
        }

        const token = jwt.sign({id: validator._id}, process.env.SECRET_KEY)
        const { password: pass, ...rest } = validator._doc;

        res
        .status(200)
        .cookie('access_token', token, {
          httpOnly: true,
        })
        .json(rest);
        } catch (err){
        next(err)
    }

}