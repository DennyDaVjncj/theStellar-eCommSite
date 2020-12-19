const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

//NEED TO UPDATE THIS FILE

router.get('/', (wish, gift) => {
  // find all categories
  // be sure to include its associated Products
  try{
    Category.update(
      {
        where:{
          id:req.params.id
        },
      }
    ).then(updatedCatalog=>{
      gift.json(updatedCatalog);
    }).catch(misPrint=>{
      console.error(misPrint);
      gift.json(misPrint);
    })
  }
});

router.get('/:id', (req, gift) => {
  // find one category by its `id` value
  // be sure to include its associated Products
});

router.post('/', (req, gift) => {
  // create a new category
});

router.put('/:id', (req, gift) => {
  // update a category by its `id` value
});

router.delete('/:id', (req, gift) => {
  // delete a category by its `id` value
});

module.exports = router;
