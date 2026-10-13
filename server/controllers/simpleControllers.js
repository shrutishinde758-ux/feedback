const { Instructor, Student } = require('../models');

exports.instructors = {
  list: async (req,res,next)=>{try{res.json(await Instructor.findAll({order:[['name','ASC']]}))}catch(e){next(e)}},
  create: async (req,res,next)=>{try{res.status(201).json(await Instructor.create(req.body))}catch(e){next(e)}}
};
exports.students = {
  list: async (req,res,next)=>{try{res.json(await Student.findAll({order:[['name','ASC']]}))}catch(e){next(e)}},
  create: async (req,res,next)=>{try{res.status(201).json(await Student.create(req.body))}catch(e){next(e)}}
};
