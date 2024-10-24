import joi from "joi"

export const SignUpMiddleware =(req, res, next)=>{
    const schema = joi.object({
        name: joi.string().required(),
        email: joi.string().email().required(),
        password: joi.string().required(),
    })
    const {error} = schema.validate(req.body)
    if(error){
        return res.status(400).send({message: "Bad Request", success: false})
    } 
    next()
}

export const LogInMiddleware =(req, res, next)=>{
    const schema = joi.object({
        email: joi.string().email().required(),
        password: joi.string().required(),
    })
    const {error} = schema.validate(req.body)
    if(error){
        return res.status(400).send({message: "Bad Request", success: false})
    }
    next()
}