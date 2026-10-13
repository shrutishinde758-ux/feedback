const { FeedbackForm, Course, Instructor } = require('../models');
const include=[{model:Course},{model:Instructor}];
exports.list=async(req,res,next)=>{try{res.json(await FeedbackForm.findAll({include,order:[['id','DESC']]}))}catch(e){next(e)}};
exports.get=async(req,res,next)=>{try{const x=await FeedbackForm.findByPk(req.params.id,{include});if(!x)return res.status(404).json({message:'Feedback form not found'});res.json(x)}catch(e){next(e)}};
exports.create=async(req,res,next)=>{try{res.status(201).json(await FeedbackForm.create(req.body))}catch(e){next(e)}};
exports.update=async(req,res,next)=>{try{const x=await FeedbackForm.findByPk(req.params.id);if(!x)return res.status(404).json({message:'Feedback form not found'});await x.update(req.body);res.json(x)}catch(e){next(e)}};
exports.remove=async(req,res,next)=>{try{const x=await FeedbackForm.findByPk(req.params.id);if(!x)return res.status(404).json({message:'Feedback form not found'});await x.destroy();res.status(204).send()}catch(e){next(e)}};
