import { csrfFetch } from './csrf.js';

const SET_REVIEWS = "reviews/SET_REVIEWS"
const REMOVE_REVIEW = "reviews/REMOVE_REVIEW"
const UPDATE_REVIEW = "reviews/UPDATE_REVIEW"
const ADD_REVIEW = "reviews/ADD_REVIEW"

const setReviews = (reviews) => ({
    type: SET_REVIEWS,
    reviews,
});

const update = (review) => ({
    type: UPDATE_REVIEW,
    payload: review,
  });

  const addReview = (review) => ({
    type: ADD_REVIEW,
    review,
  });

  const remove = (reviewId, productId) => ({
    type: REMOVE_REVIEW,
    reviewId,
    productId,
  });

  export const getReviews = () => async dispatch => {
      const response = await csrfFetch(`/api/reviews`);

    //   if (!response.ok) {
    //       throw response
    //   }

      if (response.ok) {
          const reviews = await response.json();
          dispatch(setReviews(reviews));
      }
  }

  export const createReview = ({review, userId, productId}) => async dispatch => {
      const response = await csrfFetch(`/api/reviews/`, {
          method: 'post',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({review, userId, productId})
      });
      if (response.ok) {
          const review = await response.json();
          dispatch(addReview(review));
          return review
      }
  };

  export const updateReview = data => async dispatch => {
      const response = await csrfFetch(`/api/reviews/${data.id}`, {
          method: 'put',
          headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        if (response.ok) {
            const review = await response.json();
            dispatch(update(review));
            return review;
        }
  };

  export const deleteReview = reviewId => async dispatch => {
      const response = await csrfFetch(`/api/reviews/${reviewId}`, {
          method: 'delete'
      });
      if (response.ok) {
          const review = await response.json();
          dispatch(remove(review.id, review.productId))
      }
  };

  const initialState = {};

  const reviewsReducer = (reviews = initialState, action) => {
      switch (action.type) {
          case SET_REVIEWS: {
              const reviewsPayload = action.reviews
              const newReviews = {};
              for (const review of reviewsPayload) {
                newReviews[review.id] = review;
              }
              return newReviews
          }
          case REMOVE_REVIEW: {
              const newState = {...reviews};
              delete newState[action.reviewId];
              return newState;
          }
          case ADD_REVIEW:
              return {...reviews, [action.review.id]: action.review}
          case UPDATE_REVIEW: {
              return {
                  ...reviews,
                  [action.review.id]: action.review,
              };
          }
          default:
              return reviews;
      }
  }

    export default reviewsReducer;
