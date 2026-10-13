const sequelize = require('../config/database');
const Course = require('./course')(sequelize);
const Instructor = require('./instructor')(sequelize);
const Student = require('./student')(sequelize);
const FeedbackForm = require('./feedbackForm')(sequelize);
const Evaluation = require('./evaluation')(sequelize);

Course.hasMany(FeedbackForm, { foreignKey: 'courseId', onDelete: 'CASCADE' });
FeedbackForm.belongsTo(Course, { foreignKey: 'courseId' });

Instructor.hasMany(FeedbackForm, { foreignKey: 'instructorId', onDelete: 'CASCADE' });
FeedbackForm.belongsTo(Instructor, { foreignKey: 'instructorId' });

Student.belongsToMany(FeedbackForm, { through: Evaluation, foreignKey: 'studentId', otherKey: 'feedbackFormId' });
FeedbackForm.belongsToMany(Student, { through: Evaluation, foreignKey: 'feedbackFormId', otherKey: 'studentId' });

Student.hasMany(Evaluation, { foreignKey: 'studentId', onDelete: 'SET NULL' });
Evaluation.belongsTo(Student, { foreignKey: 'studentId' });
FeedbackForm.hasMany(Evaluation, { foreignKey: 'feedbackFormId', onDelete: 'CASCADE' });
Evaluation.belongsTo(FeedbackForm, { foreignKey: 'feedbackFormId' });

module.exports = { sequelize, Course, Instructor, Student, FeedbackForm, Evaluation };
