const { DataTypes } = require('sequelize');
module.exports = (sequelize) => sequelize.define('Evaluation', {
  id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
  studentId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: true },
  feedbackFormId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
  teachingQuality: { type: DataTypes.INTEGER, allowNull: false, validate: { min: 1, max: 5 } },
  courseContent: { type: DataTypes.INTEGER, allowNull: false, validate: { min: 1, max: 5 } },
  communication: { type: DataTypes.INTEGER, allowNull: false, validate: { min: 1, max: 5 } },
  comments: { type: DataTypes.TEXT, allowNull: true },
  anonymous: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true }
}, { tableName: 'evaluations', timestamps: true });
