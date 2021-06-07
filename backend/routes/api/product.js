const express = require('express');
const asyncHandler = require('express-async-handler');

const { Product } = require('../../db/models');

const router = express.Router();

router.get('/', asyncHandler(async function(req, res) {
    const products = await Product.findAll({attributes: ['id', 'name', 'category', 'description', 'price', 'image']});
    // console.log('api/product.js-----', products[0].id)
    return res.json(products);
  }));

  //create a product
  router.post('/', asyncHandler(async(req, res) => {
      const {name, category, description, price, image} = req.body;
      const product = await Product.create({name, category, description, price, image});
      res.json(product)
  }))

module.exports = router;
