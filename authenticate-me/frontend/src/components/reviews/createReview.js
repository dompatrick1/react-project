import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createReview, deleteReview } from '../../store/reviews';
import { useHistory } from 'react-router-dom';
import ProductReviews from '../reviews/productReviews'

function CreateReviewForm () {
    const {productId} = useParams()
    const sessionUser = useSelector(state => state.session.user);
    // const newReview = useSelector(state => state.action.review)
    const dispatch = useDispatch();
    const history = useHistory();
    const [review, setReview] = useState('')
    const [newReview, setNewReview] = useState([])
    const [submitButton, setSubmitButton] = useState('')
    const updateReview = (e) => setReview(e.target.value)
    const reviews = useSelector(state => state.reviews)

    const reviewsArray = Object.values(reviews)
    let reviewUserId = []
    reviewsArray.forEach(review => {
        if(review.productId == productId) {
            reviewUserId.push(review.userId)
        }
    })

    if (sessionUser && reviewUserId.includes(sessionUser.id)) {
        return (
            <>
                <p>You have already reviewed this product</p>
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
                <form>
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
                    // Object.values(newReview[0]).
                    <div>
                        <p key={review} className="test">{Object.values(newReview)[0].userReview.review}</p>
                        <button onClick={() => deleteReview(review.id)}>Delete</button>
                    </div>
                : null}
                <div>
                    <ProductReviews reviews={reviews}/>
                </div>
            </>
        )
    } else {
        return (
            <>
                <p>Login to leave a review</p>
                <div>
                    <ProductReviews reviews={reviews}/>
                </div>
            </>
        )
    }

}
export default CreateReviewForm;
