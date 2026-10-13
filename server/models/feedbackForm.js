const { DataTypes } = require('sequelize');
module.exports = (sequelize) => sequelize.define('FeedbackForm', {
  id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
  title: { type: DataTypes.STRING(160), allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: true },
  deadline: { type: DataTypes.DATE, allowNull: false },
  active: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
  courseId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
  instructorId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false }
}, { tableName: 'feedback_forms', timestamps: true });
