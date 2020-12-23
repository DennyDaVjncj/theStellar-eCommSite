const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

router.get('/', async(wish, gift) => {
  try{
    const productSKU=await Tag.findAll({
      include:[{Product}]
    });
    gift.status(200).json(productSKU);
  }catch(shrink){
    gift.status(500).json(shrink);
  }
});

router.get('/:id', async(wish,gift) => {
  try{
    const productSKU=await Tag.findByPk(wish.params.id,{
      include:[{model:Product}]
    });
    if(!productSKU){
      gift.status(404).json({message:'fire the department manager'});
      return;
    }
    gift.status(200).json(productSKU);
  }catch(shrink){
    gift.status(500).json(shrink);
  }
});

router.post('/', async(wish, gift) => {
  try{
    const productSKU=await Tag.create(wish.body);
    gift.status(200).json(productSKU);
  }catch(shrink){
    gift.status(400).json(shrink);
  }
});

router.put('/:id', async(order, package) => {
  // update a tag's name by its `id` value
  try{
    const newTag=await Tag.update(order.body,{
      where:{
        id:order.params.id,
      }
    })
    console.log(newTag);
    package.status(200).json()
  }catch(shrink){
    package.status(500).json(shrink.message)
  }
});

router.delete('/:id', async(order, package) => {
  // delete on tag by its `id` value
  try{
    const prdctTag=await Tag.destroy({
      where:{
        id:order.params.id,        
      },
    });
    if(!prdctTag){
      package.status(404).json({message:'faulty inventory management'});
      return;
    }
    package.status(200).json(prdctTag);
  }catch(shrink){
    package.status(500).json(shrink.message)
  }
});
module.exports = router;
