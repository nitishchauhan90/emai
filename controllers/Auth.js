import { sendVerificationCode, welcomeemail } from "../middleware/Email.js";
import Usermodel from "../models/User.js";
import bcryptjs from 'bcryptjs'
const register = async(req,res)=>{
    try {
            const { name, email, password } = req.body;
            if (!name || !email || !password) {
              return res.status(400).json({ message: 'All fields are required.' });
            }
        
            const ExistingUser = await Usermodel.findOne({ email });
            if (ExistingUser) {
              return res.status(400).json({ message: 'User already exists.' });
            }
        
            const hashedPassword = await bcryptjs.hashSync(password, 10);
            const verificationCode = Math.floor(100000 + Math.random()*900000).toString()
            const newUser = new Usermodel({ 
              name, 
              email, 
              password: hashedPassword,
              verificationCode
            });
            await newUser.save();
            sendVerificationCode(newUser.email,verificationCode)
            res.status(200).json({success:"true", message: 'User registered successfully!',newUser });
              
    } catch (error) {
        console.error('Error during registration:', error.message);
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
}
const verifyemail = async(req,res) =>{
    try {
        const {code}  = req.body;
        const user = await Usermodel.findOne({verificationCode:code})
        if(!user){
            return res.status(400).json({message:"Invalid code"})
        }
        user.isVerified = true
        user.verificationCode = undefined
        await user.save()
        await welcomeemail(user.email,user.name);
        res.status(200).json({message:"Email verified successfully"})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"internal Server error"})
    }
}

export {register,verifyemail}