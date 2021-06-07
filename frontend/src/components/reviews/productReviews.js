import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// import {User} from {}
import ReturnUsers from '../users/index'
import { getReviews, deleteReview } from '../../store/reviews';
import {getUsers} from '../../store/users'
import './review.css'

    function ProductReviews () {

        const { productId } = useParams();
        const sessionUser = useSelector(state => state.session.user);
        const usersList = useSelector(state => state.users)
        const reviews = useSelector(state => Object.values(state.reviews))
        // const [review, setReview] = useState(reviews)
        const dispatch = useDispatch();


        useEffect(() => {
            dispatch(getReviews())
        },[dispatch])

        // const reviewsArray = Object.values(reviews);
        // const [reviewState, setReviewState] = useState(reviewsArray)

        let reviewList = []

        reviews.forEach(rev => {
            if(rev.productId == productId) {
                reviewList.push(rev)
            }
        })

        // console.log(reviewState)
        const handleDelete = async (e, review) => {
            e.preventDefault()
            await dispatch(deleteReview(review.id))
            dispatch(getReviews())
        }

        return (
            <>
                <div>
                    {reviewList.slice(0).reverse().map(review => {
                        return (
                        <div className="user-review">
                            {review ?
                                <div>
                                    <ReturnUsers review={review}/>
                                    <p key={review} className="test">{review.review}</p>
                                </div>
                            : null}
                                {sessionUser && review.userId === sessionUser.id ?
                                    <button onClick={(e) => handleDelete(e, review)}>X</button>
                                : null}
                        </div>
                        )
                    })}

                </div>
            </>
        )

    }
    export default ProductReviews;
