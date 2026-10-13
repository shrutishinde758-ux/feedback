const { DataTypes } = require('sequelize');
module.exports = (sequelize) => sequelize.define('Student', {
  id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
  rollNo: { type: DataTypes.STRING(30), allowNull: false, unique: true },
  name: { type: DataTypes.STRING(120), allowNull: false, validate: { notEmpty: true } },
  email: { type: DataTypes.STRING(150), allowNull: false, unique: true, validate: { isEmail: true } },
  course: { type: DataTypes.STRING(120), allowNull: false }
}, { tableName: 'students', timestamps: true });
