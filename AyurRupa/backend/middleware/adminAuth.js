import jwt from "jsonwebtoken"



const adminAuth = async (req,res,next)=>{
    try {
        const {token}= req.headers;
        
        if (!token) {
            return res.json({success:false, message:"Not authorized"})
            
        }

        const tokenDecode = jwt.verify(token,process.env.JWT_SECRET );
        
        if (tokenDecode.email  !== process.env.ADMIN_EMAIL) {
            return res.json({success:false, message:"Not authorized,Token missing"})
        }
        next()
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
    }
}


export default adminAuth;