import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createReview } from '../../store/reviews';
import { useHistory } from 'react-router-dom';

function CreateReviewForm () {
    const {productId} = useParams()
    const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const history = useHistory();
    const [review, setReview] = useState('')
    const userId = sessionUser.id
    const updateReview = (e) => setReview(e.target.value)

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            review,
            userId,
            productId
          };
          const productReview = await dispatch(createReview(payload));
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholders="Leave a review"
                    required
                    value={review}
                    onChange={updateReview}
                />
                <button type="submit">Submit</button>
            </form>
        </>
    )
}
export default CreateReviewForm;
