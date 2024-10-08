const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findAll({
      include:
      [
        {model: Product}
      ]
    });
    res.status(200).json(categoryData);
  } catch(err){
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include:
      [
        {model: Product}
      ]
    });

    if (!categoryData){
      res.status(400).json({message: 'There is no category by this id.'})
      return;
    }

    res.status(200).json(categoryData)
  } catch(err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try{
    const categoryData = Category.create(req.body);
    res.status(200).json(categoryData);
  } catch(err) {
    console.log(err);
    res.status(501).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
    await Category.update(req.body, {
      where: {
        id: req.params.id
      }
    })
    .then((category) => {
      res.status(200).json(category)
    })
    .catch((err) => {
      console.log(err);
      res.status(502).json(err);
    })
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  const categoryData = await Category.destroy({
    where: {
      id: req.params.id
    }
  })
  .then( categoryData => {
    res.status(200).json(categoryData);
  })
  .catch((err) => {
    console.log(err);
    res.status(503).json(err)
  })
});

module.exports = router;
