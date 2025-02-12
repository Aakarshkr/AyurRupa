import jwt from "jsonwebtoken"

const adminAuth = async (req,res,next)=>{
    try {
        const {token}= req.headers;
        console.log('token in list:', token);
        
        if (!token) {
            return res.json({success:false, message:"Not authorized"})
            
        }

        const tokenDecode = jwt.verify(token,process.env.JWT_SECRET );
        console.log(tokenDecode);
        
        if (tokenDecode.email  !== process.env.ADMIN_EMAIL) {
            return res.json({success:false, message:"Not authorized"})
        }
        if (tokenDecode) {
         console.log('Decode Success');
            
        }
        next()
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
    }
}


export default adminAuth;