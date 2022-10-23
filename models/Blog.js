const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Blog extends Model{}

Blog.init(
{
    id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true, 
    },
    blog_title:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    author_name:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    blog_body:{
        type: DataTypes.STRING,
        allowNull: false,
    },   
},
{
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'blog',
}

);

module.exports = Blog;