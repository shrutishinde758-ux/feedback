const { DataTypes } = require('sequelize');
module.exports = (sequelize) => sequelize.define('Instructor', {
  id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING(120), allowNull: false, validate: { notEmpty: true } },
  email: { type: DataTypes.STRING(150), allowNull: false, unique: true, validate: { isEmail: true } },
  department: { type: DataTypes.STRING(100), allowNull: false }
}, { tableName: 'instructors', timestamps: true });
