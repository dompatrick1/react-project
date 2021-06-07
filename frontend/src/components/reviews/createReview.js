import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createReview, deleteReview } from '../../store/reviews';
import ProductReviews from './productReviews'
import '../product/product.css'

function CreateReviewForm () {
    const {productId} = useParams()
    const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const [review, setReview] = useState('')
    const [newReview, setNewReview] = useState([])
    const [submitButton, setSubmitButton] = useState('')
    const updateReview = (e) => setReview(e.target.value)
    const reviews = useSelector(state => state.reviews)
    // console.log('@@@@@@@', sessionUser.username)

    const reviewsArray = Object.values(reviews)
    let reviewUserId = []
    reviewsArray.forEach(review => {
        if(review.productId == productId) {
            reviewUserId.push(review.userId)
        }
    })

    const handleDelete = async (e) => {
        e.preventDefault()
        setNewReview(dispatch(deleteReview(Object.values(newReview)[0].userReview.id)))
    }

    if (sessionUser && reviewUserId.includes(sessionUser.id)) {
        return (
            <>
                <p className="already-reviewed">You have already reviewed this product</p>
                <div>
                    <ProductReviews reviews={reviews}/>
                </div>
            </>
        )
    }

    else if (sessionUser) {
        let userId;
        userId = sessionUser.id

        const handleSubmit = async (e) => {
            e.preventDefault();

            const payload = {
                review,
                userId,
                productId
              };
            const productReview = await dispatch(createReview(payload));
            setNewReview([productReview])
            setReview('')
            setSubmitButton("true")


        }


        return (
            <>
                <form className="review-form">
                    <input
                        type="text"
                        placeholders="Leave a review"
                        required
                        value={review}
                        onChange={updateReview}
                    />
                    <button type='submit' hidden={submitButton} onClick={handleSubmit}>Submit</button>
                </form>
                {Object.values(newReview)[0] ?
                    <div className="user-review">
                        <h1>{sessionUser.username}</h1>
                        <p key={review} >{Object.values(newReview)[0].userReview.review}</p>
                        <button onClick={handleDelete}>X</button>
                    </div>
                : null}
                <div>
                    <ProductReviews />
                </div>
            </>
        )
    } else {
        return (
            <>
                <p className="login-to-review">Login to leave a review</p>
                <div>
                    <ProductReviews />
                </div>
            </>
        )
    }

}
export default CreateReviewForm;
