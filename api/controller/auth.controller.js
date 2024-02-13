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
        // res.header('Access-Control-Allow-Origin', "https://zany-adventure-vr7pwrvvvvfx6xx-5173.app.github.dev");
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


export const google = async (req, res, next) => {
    const { name, email, googlePhotoUrl } = req.body;
    
    try{
        const user = await User.findOne({ email })
        if(user){
            const token = jwt.sign({id: user._id}, process.env.SECRET_KEY)
            const { password, ...rest } = user._doc
            res
            .status(200)
            .cookie('access_token', token, {
              httpOnly: true,
            })
            .json(rest)
            return
        } else {
            const genertaedPassword = Math.random().toString(36).slice(-8)
            const hashedPassword = bcryptjs.hashSync(genertaedPassword, 10)
            
            const newUser = new User({
                username: name.toLowerCase().split(' ').join('') + Math.floor(Math.random().toString(9).slice(-6)),
                email,
                password: hashedPassword,
                profilePicture: googlePhotoUrl 
            })
            await newUser.save()

            const token = jwt.sign({id: newUser._id}, process.env.SECRET_KEY)
            const { password, ...rest } = newUser._doc
            res
            .status(200)
            .cookie('access_token', token, {
              httpOnly: true,
            })
            .json(rest)
        }
        
    } catch(err){
        next(err)
    }
}