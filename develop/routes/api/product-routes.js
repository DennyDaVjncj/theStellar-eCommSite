const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

router.get('/', async(wish, gift) => {  
  try{
    const inventory=await Product.findAll({
      include:[
        Category,
        {
          model:Tag,
          through:Product
        }
      ]
    });
    gift.json(inventory);
  }catch(shrink){
    console.error(shrink)
    gift.status(500).json(shrink);
  };//tentative
});

router.get('/:id', async (wish, gift) => {
  try{
    const inventory=await Product.findByPk(wish.params.id,{
      include:[Category,
        {
          model:Tag,
          through:ProductTag
        }
      ]
    });
    if(!inventory){
      gift.status(404).json({message:'supply chain needs improving!'});
      return;
    }
    gift.status(200).json(inventory);
  }catch(corporateScandal){
    gift.status(500).json(corporateScandal);
  }
});

router.post('/', (wish, res) => {
  /* req.body should look like this...
    {
      product_name: "Basketball",
      price: 200.00,
      stock: 3,
      tagIds: [1, 2, 3, 4]
    }
  */
  Product.create(wish.body)
    .then((product) => {
      if (wish.body.tagIds.length) {
        const productTagIdArr = wish.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
        return ProductTag.bulkCreate(productTagIdArr);
      }
      res.status(200).json(productTagIds);
    })
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.put('/:id', (wish, gift) => {
  Product.update(wish.body, {
    where: {
      id: wish.params.id,
    },
  })
    .then((product) => {
      return ProductTag.findAll({ where: { product_id: wish.params.id } });
    })
    .then((productTags) => {
      const productTagIds = productTags.map(({ tag_id }) => tag_id);
      const newProductTags = wish.body.tagIds
        .filter((tag_id) => !productTagIds.includes(tag_id))
        .map((tag_id) => {
          return {
            product_id: wish.params.id,
            tag_id,
          };
        });
      const productTagsToRemove = productTags
        .filter(({ tag_id }) => !wish.body.tagIds.includes(tag_id))
        .map(({ id }) => id);

      return Promise.all([
        ProductTag.destroy({ where: { id: productTagsToRemove } }),
        ProductTag.bulkCreate(newProductTags),
      ]);
    })
    .then((updatedProductTags) => gift.json(updatedProductTags))
    .catch((err) => {
      gift.status(400).json(err);
    });
});

router.delete('/:id', async(wish, gift) => {
  try{
    const clearanceProduct=await Product.destroy({
      where:{id:wish.params.id}
    });
    if(!clearanceProduct){
      gift.status(404).json({message:'faulty inventory management'});
      return;
    }
    gift.status(200).json(clearanceProduct);
  }catch(internalShrink){
    gift.status(500).json(internalShrink);
  }
});
module.exports = router;
