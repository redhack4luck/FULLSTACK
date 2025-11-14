const Joi=require('joi');
const authService=require('../services/authService');

exports.register = async(req,res,next)=>{
  try{
    const s = Joi.object({email:Joi.string().email().required(),password:Joi.string().min(6).required()});
    const {error,v} = s.validate(req.body);if(error)return res.status(400).json({message:error.details[0].message});
    const u = await authService.registerUser(v.email,v.password);res.status(201).json({id:u._id,email:u.email});
  }
  catch(e)
  {
    next(e);
  }

};

exports.login = async(req,res,next)=>{
  try{
    const s = Joi.object({email:Joi.string().email().required(),password:Joi.string().required()});
    const {error,v} = s.validate(req.body);
    if(error) return res.status(400).json({message:error.details[0].message});
    const t = await authService.loginUser(v.email,v.password);res.json({token:t});
  }
  catch(e){
    next(e);
  }
};
