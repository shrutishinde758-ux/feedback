const { Course } = require('../models');
exports.list = async (req,res,next)=>{try{res.json(await Course.findAll({order:[['id','DESC']]}));}catch(e){next(e)}};
exports.get = async (req,res,next)=>{try{const x=await Course.findByPk(req.params.id); if(!x)return res.status(404).json({message:'Course not found'}); res.json(x)}catch(e){next(e)}};
exports.create = async (req,res,next)=>{try{res.status(201).json(await Course.create(req.body))}catch(e){next(e)}};
exports.update = async (req,res,next)=>{try{const x=await Course.findByPk(req.params.id);if(!x)return res.status(404).json({message:'Course not found'});await x.update(req.body);res.json(x)}catch(e){next(e)}};
exports.remove = async (req,res,next)=>{try{const x=await Course.findByPk(req.params.id);if(!x)return res.status(404).json({message:'Course not found'});await x.destroy();res.status(204).send()}catch(e){next(e)}};
