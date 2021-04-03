import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getReviews, deleteReview } from '../../store/reviews';
import './review.css'

    function ProductReviews ({reviews}) {

        const { productId } = useParams();
        const sessionUser = useSelector(state => state.session.user);
        const dispatch = useDispatch();
        const reviewsArray = Object.values(reviews)

        useEffect(() => {
            dispatch(getReviews())
        }, [dispatch])

        let reviewList = []

        reviewsArray.forEach(review => {
            if(review.productId == productId) {
                reviewList.push(review)
            }
        })
        // console.log('------',review)
        // console.log('----------??', reviewsArray)

        return (
            <>
                <div>
                    {reviewList.slice(0).reverse().map(review => {
                        return (
                        <div>
                            <p key={review} className="test">{review.review}</p>
                            {review.userId === sessionUser.id ?
                                <button onClick={() => deleteReview(review.id)}>Delete</button>
                            : null}
                        </div>
                        )
                    })}

                </div>
            </>
        )

    }
    export default ProductReviews;
