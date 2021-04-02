import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getReviews } from '../../store/reviews';
import './'

    function ProductReviews () {
        // const {reviewId} = useParams()
        // const {userId} = useParams()
        // const { productId } = useParams();
        const reviews = useSelector(state => state.reviews)
        const dispatch = useDispatch();

        const reviewsArray = Object.values(reviews)


        reviewsArray.map(review => {
            console.log('------', review.review)
        })

        useEffect(() => {
            dispatch(getReviews())
        }, [dispatch])


        return (
            <>
                {reviewsArray.map(review => {
                    <p className="test">{review.review}</p>
                })}
            </>
        )

    }
export default ProductReviews;
