const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint
// const endpoint=require('/routes');

// get all products
router.get('/', async(wish, gift) => {  
  try{
    console.log(wish);
    const inventory=await Product.findAll({
      include:[{Category}]
    });
    gift.json(inventory);
  }catch(sin){
    gift.json(sin);
  };//tentative

  // be sure to include its associated Category and Tag data
});

// get one product
router.get('/:id', async (wish, gift) => {
  // find a single product by its `id`
  try{
    const inventory=await Product.findByPk(wish.params.id,{
      include:[{model:Category}]
    });
    if(!inventory){
      gift.status(404).json({message:'supply chain needs improving!'});
      return;
    }
    gift.status(200).json(inventory);
  }catch(corporateScandal){
    gift.status(500).json(corporateScandal);
  }
  // be sure to include its associated Category and Tag data
});

// create new product
router.post('/', (wish, gift) => {
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
      // if there's product tags, we need to create pairings to bulk create in the ProductTag model
      if (wish.body.tagIds.length) {
        const productTagIdArr = wish.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
        return ProductTag.bulkCreate(productTagIdArr);
      }
      // if no product tags, just respond
      res.status(200).json(product);
    })
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// update product
router.put('/:id', (wish, gift) => {
  // update product data
  Product.update(wish.body, {
    where: {
      id: wish.params.id,
    },
  })
    .then((product) => {
      // find all associated tags from ProductTag
      return ProductTag.findAll({ where: { product_id: wish.params.id } });
    })
    .then((productTags) => {
      // get list of current tag_ids
      const productTagIds = productTags.map(({ tag_id }) => tag_id);
      // create filtered list of new tag_ids
      const newProductTags = wish.body.tagIds
        .filter((tag_id) => !productTagIds.includes(tag_id))
        .map((tag_id) => {
          return {
            product_id: wish.params.id,
            tag_id,
          };
        });
      // figure out which ones to remove
      const productTagsToRemove = productTags
        .filter(({ tag_id }) => !wish.body.tagIds.includes(tag_id))
        .map(({ id }) => id);

      // run both actions
      return Promise.all([
        ProductTag.destroy({ where: { id: productTagsToRemove } }),
        ProductTag.bulkCreate(newProductTags),
      ]);
    })
    .then((updatedProductTags) => gift.json(updatedProductTags))
    .catch((err) => {
      // console.log(err);
      gift.status(400).json(err);
    });
});

router.delete('/:id', async(wish, gift) => {
  // delete one product by its `id` value
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
