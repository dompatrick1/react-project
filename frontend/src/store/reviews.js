import { csrfFetch } from './csrf.js';

const SET_REVIEWS = "reviews/SET_REVIEWS"
const REMOVE_REVIEW = "reviews/REMOVE_REVIEW"
const UPDATE_REVIEW = "reviews/UPDATE_REVIEW"
const ADD_REVIEW = "reviews/ADD_REVIEW"

export const setReviews = (reviews) => {
    return {
        type: SET_REVIEWS,
        payload: reviews,
    }

};

const update = (review) => {
    return {
        type: UPDATE_REVIEW,
        payload: review,
    }
  };

  const addReview = (review) => {
    return {
        type: ADD_REVIEW,
        payload: review,
    }
  };

  const remove = (reviewId) => ({
    type: REMOVE_REVIEW,
    payload: reviewId,
  });


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

  export const updateReview = ({id, review, userId, productId}) => async dispatch => {
      const response = await csrfFetch(`/api/reviews/${id}`, {
          method: 'put',
          headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({review, userId, productId})
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
          dispatch(remove(review.id))
      }
      return {}
  };

  export const getReviews = () => async dispatch => {
    const response = await csrfFetch(`/api/reviews/`);

    if (!response.ok) {
        throw response
    }
    const reviews = await response.json();
    dispatch(setReviews(reviews));
    return reviews
}

  const initialState = {};

  const reviewsReducer = (reviews = initialState, action) => {
      switch (action.type) {
          case SET_REVIEWS: {
              const reviewsPayload = action.payload
              const newReviews = {};
              for (const review of reviewsPayload) {
                newReviews[review.id] = review;
              }
              return newReviews
          }
          case REMOVE_REVIEW: {
              const newState = {...reviews};
              delete newState[action.payload];
              return newState;
          }
          case ADD_REVIEW:
              return {...reviews, [action.payload.id]: action.payload}
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
