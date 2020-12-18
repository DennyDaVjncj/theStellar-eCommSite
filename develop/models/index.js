// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');
const sequential=require('../config/connection')

// Products belongsTo Category
Product.belongsTo(Category,{
  foreignKey:'id',
  onDelete:'CASCADE'
});

// Categories have many Products
Category.hasMany(Product,{
  foreignKey:'id',
  onDelete:'CASCADE'
});

// Products belongToMany Tags (through ProductTag)
// Product.belongsToMany(Tag,{
//   foreignKey:'id',
//   onDelete:'CASCADE'
// });

// Tags belongToMany Products (through ProductTag)
// Tag.belongsToMany(Product,{
//   foreignKey:'id',
//   onDelete:'CASCADE'
// });

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
