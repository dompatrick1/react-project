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
        const [editReview, setEditReview] = useState(true)
        const dispatch = useDispatch();


        useEffect(() => {
            dispatch(getReviews())
        },[dispatch])


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

        const handleEdit = async (e, review) => {
            e.preventDefault()
            setEditReview(false)

        }

        const handleSubmit = async (e) => {
            e.preventDefault();



        }

        return (
            <>
                <div>
                    {reviewList.slice(0).reverse().map(review => {
                        return (
                        <div className="user-review">
                            {review && editReview === true ?
                                <div>
                                    <ReturnUsers review={review}/>
                                    <p key={review} className="test">{review.review}</p>
                                </div>
                            : editReview === false ?
                                <form className="review-form">
                                    <input
                                        type="text"
                                        placeholders="Leave a review"
                                        required
                                        value={review}
                                        onChange={updateReview}
                                    />
                                    <button type='submit' onClick={handleSubmit}>Submit</button>
                                </form>
                            : null}
                                {sessionUser && review.userId === sessionUser.id ?
                                    <div>
                                        <button onClick={(e) => handleDelete(e, review)}>X</button>
                                        <button onClick={(e) => handleEdit(e, review)}>Edit</button>
                                    </div>
                                : null}
                        </div>
                        )
                    })}

                </div>
            </>
        )

    }
    export default ProductReviews;
