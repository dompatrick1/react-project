const express = require('express');
const asyncHandler = require('express-async-handler');

const { Cart } = require('../../db/models')

const router = express.Router()

router.get("/", asyncHandler(async(req, res) => {
    const carts = await Cart.findAll({attributes: ['id', 'userId', 'productId', 'createdAt', 'updatedAt']});
    res.json(carts)
}))

router.post("/", asyncHandler(async(req, res) => {

    const {userId, productId} = req.body

    let userItem = await Cart.findOne({ where: {userId, productId}})
    if (userItem) {
        return res.json({submitted: false})
    }

    userItem = await Cart.create({userId, productId})
    return res.json({submitted: true, userItem})
}))

router.delete('/:id', asyncHandler(async(req, res) => {

    await Cart.destroy({where: {id: req.params.id}})
    res.status(204).end()
}));

module.exports = router;