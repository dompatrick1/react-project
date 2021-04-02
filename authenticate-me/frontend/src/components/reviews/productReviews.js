import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getReviews } from '../../store/reviews';
import './review.css'

    function ProductReviews () {
        // const {reviewId} = useParams()
        // const {userId} = useParams()
        const { productId } = useParams();
        const reviews = useSelector(state => state.reviews)
        const dispatch = useDispatch();

        const reviewsArray = Object.values(reviews)


        let reviewList = []

        reviewsArray.forEach(review => {
            if(review.productId == productId) {
                reviewList.push(review)
            }
        })
        console.log('------',reviewList)

        useEffect(() => {
            dispatch(getReviews())
        }, [dispatch])


        return (
            <>
            <div>
                {reviewList.map(review => {
                    return <p className="test">{review.review}</p>
                })}

            </div>
            </>
        )

    }
    export default ProductReviews;
