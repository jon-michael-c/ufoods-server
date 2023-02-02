import Users from "../models/Users.js"
import jwt from "jsonwebtoken";
import validator from "validator";

const createToken = (_id) => {
    return jwt.sign({_id}, "secretkey123", {expiresIn: "1d"})
}

/* READ */
export const getUser = async (req, res) => {
    try {
        const {id} = req.params
        console.log(id)
        const user = await Users.findOne({email: id})
        console.log(user._id.toString())
        res.status(200).json({userId: user._id.toString()})
    } catch(err) {
        res.status(404).json({message: err.message})
    }
}

/* Remove User */
export const removeUser = async (req, res) => {
    try {
        const {id} = req.params
        const user = await Users.findById(id)
        
        
        res.status(200).json(user);
    } catch(err) {
        res.status(401).json({message: err.message})
    }
}

/* Create User */
export const createUser = async (req, res) => {
    try {
        const user = req.body;
        const newUser = new Users(user);
        await newUser.save()
        
        res.status(200).json(newUser);
    } catch(err) {
        res.status(401).json({message: err.message})
    }
}


/* Login User */
    
export const loginUser = async (req, res) => {
    const {email, password} = req.body
    
    try {
        const user = await Users.login(email, password)
        const token = createToken(user._id);
        const id = user.id
        res.status(200).json({id, email, token});
    } catch(err) {
        res.status(400).json({message: err.message})
    }
}

/* SignUp User */
    
export const signUpUser = async (req, res) => {
    const {email, password} = req.body
    
    try {
        const user = await Users.signup(email, password);

    //create a token
    const token = createToken(user._id);

    res.status(200).json({ email, token });
    } catch(err) {
        res.status(400).json({message : err.message})
    }
}