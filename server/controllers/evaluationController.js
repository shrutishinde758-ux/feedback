const { Evaluation, FeedbackForm, Course, Instructor, Student, sequelize } = require('../models');
exports.list=async(req,res,next)=>{try{res.json(await Evaluation.findAll({include:[{model:FeedbackForm,include:[Course,Instructor]},{model:Student}],order:[['id','DESC']]}))}catch(e){next(e)}};
exports.create=async(req,res,next)=>{try{
  const data={...req.body};
  if(data.anonymous) data.studentId=null;
  const form=await FeedbackForm.findByPk(data.feedbackFormId);
  if(!form) return res.status(404).json({message:'Feedback form not found'});
  if(!form.active) return res.status(400).json({message:'This feedback form is inactive'});
  if(new Date(form.deadline)<new Date()) return res.status(400).json({message:'Feedback deadline has passed'});
  res.status(201).json(await Evaluation.create(data));
}catch(e){next(e)}};

exports.summary=async(req,res,next)=>{try{
  const [rows]=await sequelize.query(`
    SELECT ff.id AS feedbackFormId, ff.title, c.name AS courseName,
           ROUND(AVG((e.teachingQuality+e.courseContent+e.communication)/3),2) AS averageRating,
           COUNT(e.id) AS responseCount
    FROM feedback_forms ff
    JOIN courses c ON c.id=ff.courseId
    LEFT JOIN evaluations e ON e.feedbackFormId=ff.id
    GROUP BY ff.id, ff.title, c.name
    ORDER BY averageRating DESC
  `);
  res.json(rows);
}catch(e){next(e)}};

exports.filter=async(req,res,next)=>{try{
  const courseId=Number(req.query.courseId)||null;
  const minRating=Number(req.query.minRating)||0;
  const [rows]=await sequelize.query(`
    SELECT e.id, ff.title, c.name AS courseName, i.name AS instructorName,
           ROUND((e.teachingQuality+e.courseContent+e.communication)/3,2) AS rating,
           e.comments, e.anonymous, e.createdAt
    FROM evaluations e
    JOIN feedback_forms ff ON ff.id=e.feedbackFormId
    JOIN courses c ON c.id=ff.courseId
    JOIN instructors i ON i.id=ff.instructorId
    WHERE (:courseId IS NULL OR c.id=:courseId)
      AND ((e.teachingQuality+e.courseContent+e.communication)/3) >= :minRating
    ORDER BY e.createdAt DESC
  `,{replacements:{courseId,minRating}});
  res.json(rows);
}catch(e){next(e)}};
