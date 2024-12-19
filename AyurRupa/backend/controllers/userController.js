import userModel from "../models/userModel.js";
import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const createToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
}

//route for user loggin 
const loginUser= async (req,res)=>{
    try {
        const {email, password}= req.body;

        const user = await userModel.findOne({email});
        if (!user) {
            return  res.json({success:false , message: "user doesn't exists"})
        }

        const isMatch = await bcrypt.compare(password,user.password);

        if (isMatch) {
            const token = createToken(user._id)    ;
            res.json({success:true,token})
        }else{
            res.json({success:false,message : "invalid credentials"})
        }
        
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
    }

}




//route for user registration

const registerUser = async (req,res)=>{
try {
    const {name , email , password}= req.body;
    //checking user exists or not 
    const exist = await userModel.findOne({email});

    if(exist){
        return  res.json({success:false , message: "User Already Exists"})
    }

    //VALIDATING EMAIL AND STRONG PASSWORD
    if (!validator.isEmail(email)) {
       return res.json({success:false , message: "Please enter valid email"})
    }
    if (password.length < 8) {
        return res.json({success:false , message: "Please enter a strong password"})
    }

    //hashing pass
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt)



    const newUser= new userModel({name,email,password:hashedPassword})
    const user = newUser.save() 
    const token = createToken(user._id);
    console.log(token);
    

    res.json({success:true,token})
    
} catch (error) {
    console.log(error);
    res.json({success:false, message:error.message})
    
}

} 


//route for admin login
const adminLogin = async (req, res) => {
    try {
      const { email, password } = req.body;
      console.log(email, password);
      
  
      // Check if the provided email and password match the admin credentials in environment variables
      if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
        
        // Create a token by signing a payload that can include useful info (e.g., email)
        const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });
        
        // Respond with the token if successful
        res.json({ success: true, token });
      } else {
        // Respond with an error if credentials are invalid
        res.json({ success: false, message: "Invalid credentials" });
      }
    } catch (error) {
      console.error(error);
      res.json({ success: false, message: error.message });
    }
  };
  


export {loginUser,registerUser,adminLogin}