const router = require('express').Router();
const { Category, Product, Tag, ProductTag } = require('../../models');

router.get('/', async(order, package)=>{
try{
  const catalog=await Category.findAll(order.params.id,{
    include:[{model:Product},{model:Tag}]
  });
  if(!catalog){
    package.status(404).json({message:'hire new merchandiser ASAP!'});
    return;
  }
  package.status(200).json(catalog);
}catch(shrink){
  package.status(500).json(shrink);
}
});

router.get('/:id', async(order,package) => {
    try{
      const catalog=await Category.findByPk(order.params.id,{
        include:[Product],
      });
      // console.log(order);
      if(!catalog){
        package.status(404).json({message:'faulty supplier'});
        return;
      }
      package.status(200).json(catalog);
    }catch(shrink){
      package.status(500).json(shrink.message);
    }
});//not eveyting is ideal with our 'orders', but they're at the least clocking in for work

router.post('/', async (order, package) => {  
  try{
    const newCatalog=await Category.create(order.body);
    console.log(newCatalog);
    package.status(200).json(newCatalog);
  }catch(shrink){
    package.status(400).json(shrink);
  }
});//additional content needed within body of postman

router.put('/:id', (order, package) => {
  try{
    Category.update(order.body,{
        where:{
          id:order.params.id,
        },      
      }).then(updatedCatalog=>{
      console.log(updatedCatalog);
      package.json(updatedCatalog);
    })
  }catch(misPrint){
    console.error(misPrint);
    package.status(200).json(misPrint);    
  }
});

router.delete('/:id', async(order,package) => {
  try{
  const catalog=await Category.destroy({
    where:{
      id:order.params.id,
  },
  });
  if(!catalog){
    package.status(404).json({message:'faulty supply chain'});
    return;
  }
  package.status(200).json(catalog);
}catch(shrink){
  package.status(500).json(shrink);
}
});
module.exports = router;
