const { DataTypes } = require('sequelize');
module.exports = (sequelize) => sequelize.define('Course', {
  id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
  code: { type: DataTypes.STRING(20), allowNull: false, unique: true, validate: { notEmpty: true } },
  name: { type: DataTypes.STRING(120), allowNull: false, validate: { notEmpty: true } },
  semester: { type: DataTypes.STRING(30), allowNull: false },
  department: { type: DataTypes.STRING(100), allowNull: false }
}, { tableName: 'courses', timestamps: true });
