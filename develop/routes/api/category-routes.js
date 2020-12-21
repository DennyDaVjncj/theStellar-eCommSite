const router = require('express').Router();
const { Category, Product, Tag, ProductTag } = require('../../models');

// The `/api/categories` endpoint

//NEED TO UPDATE THIS FILE

router.get('/', async(order, package) => {
  // find all categories
  // be sure to include its associated Products
  try{
    const catalog=await Category.findAll({{
      include:[
      Category,
      {
        model:Product,
        through:ProductTag
      }
    ] 
  });
  package.json(catalog);
}catch(shrink){
  console.error(shrink);
  package.status(500).json(shrink);
}
});

router.get('/:id', async(order,package) => {
  // find one category by its `id` value
  // be sure to include its associated Products
    try{
      const catalog=await Category.findByPk(order.params.id,{
        include:[Product,{model:Tag,through:ProductTag}]
      });
      console.log(order);
      if(!catalog){
        package.status(404).json({message:'faulty supplier'});
        return;
      }
      package.status(200).json(catalog);
    }catch(shrink){
      package.status(500).json(shrink);
    }
});

router.post('/', (order, package) => {
  // create a new category
  Category.create(order.body).then(newCatalog=>{
    if(order.body.tagIds.length){
      const catalogManager=order.body.tagIds.map((tag_id)=>{
        return{
          catagory_id:catagory_id,
          tag_id,
        }
      }
    }
  })
});

router.put('/:id', (wish, gift) => {
  // update a category by its `id` value
  try{
    Category.update(wish.body,      
      {
        where:{
          id:wish.params.id
        },
      }
    ).then(updatedCatalog=>{
      console.log(wish);
      gift.json(updatedCatalog);
    })
  }catch(misPrint){
    console.error(misPrint);
    gift.json(misPrint);
  }
});

router.delete('/:id', (req, gift) => {
  // delete a category by its `id` value
});

module.exports = router;
