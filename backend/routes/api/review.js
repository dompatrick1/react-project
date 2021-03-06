const express = require('express');
const asyncHandler = require('express-async-handler');

const { Review, User } = require('../../db/models')

const router = express.Router()

router.get("/", asyncHandler(async(req, res) => {
    const reviews = await Review.findAll({attributes: ['id', 'review', 'userId', 'productId', 'createdAt', 'updatedAt']});
    // console.log('api/review.js-----', reviews[0].review)
    return res.json(reviews)
}))

router.post("/", asyncHandler(async(req, res) => {

    const {review, userId, productId} = req.body

    let userReview = await Review.findOne({ where: {userId, productId}})
    if (userReview) {
        return res.json({submitted: false})
    }
    userReview = await Review.create({review, userId, productId})
    return res.json({submitted: true, userReview})
}))

router.put('/:id', asyncHandler(async(req, res) => {
    if (!res.locals.authenticated) {
        return res.status(403).end()
    }

    const userId = res.locals.user.id
    const productId = req.params.id
    const review = req.body.userReview
    const reviewId = req.params.reviewId

    let userReview = await Review.findOne({ where: {userId, productId: req.params.productId}})

    if (userReview.userId !== userId) {
        return res.status(403).end()
    }
    userReview.review = review
    userReview = await userReview.update()
    res.json({userReview})
}))

router.delete('/:id', asyncHandler(async(req, res) => {

    let deleted = await Review.destroy({where: {id: req.params.id}})
    return res.json(deleted)
}));

module.exports = router;
