import jwt from "jsonwebtoken";
export const taskMiddleware =(req, res, next)=>{
    const token = req.cookies?.token;
    if(!token){
        return res.status(401).json({message: 'Unauthorized'})
    }
    const decoded = jwt.verify(token, process.env.SECRET_KEY)
    console.log(decoded)
    req.user = decoded
    next()
}