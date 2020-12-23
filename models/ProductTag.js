const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class ProductTag extends Model {}

ProductTag.init(
  {
    // define columns
    id:{
      type:DataTypes.INTEGER,
      allowNull:false,
      primaryKey:true,
      autoIncrement:true
    },
    product_id:{
      type:DataTypes.INTEGER,
      references:{
        model:'product',
        key:'id'
      }//foreign key
    },
    tag_id:{
      type:DataTypes.INTEGER,
      references:{
        model:'tag',
        key:'id'
      }//foreign key
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'productTag',
  }
);

module.exports = ProductTag;
