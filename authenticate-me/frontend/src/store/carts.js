import { csrfFetch } from './csrf.js';

const SET_CARTS = "carts/SET_CARTS"
const REMOVE_CART = "carts/REMOVE_CART"
const ADD_CART = "carts/ADD_CART"


export const setCarts = (carts) => {
    return {
        type: SET_CARTS,
        payload: carts,
    }

};


  const addCart = (cart) => {
    return {
        type: ADD_CART,
        payload: cart,
    }
  };

  const remove = (cartId) => ({
    type: REMOVE_CART,
    payload: cartId,
  });

  export const createCart = ({userId, productId}) => async dispatch => {
    const response = await csrfFetch(`/api/carts/`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({userId, productId})
    });

    if (response.ok) {
        const cart = await response.json();
        dispatch(addCart(cart));
        return cart;
    }
};

    export const deleteCart = cartId => async dispatch => {
        const response = await csrfFetch(`/api/carts/${cartId}`, {
            method: 'delete'
        });

        if (response.ok) {
            const cart = await response.json();
            dispatch(remove(cart.id))
        }
    };

    export const getCarts = () => async dispatch => {
    const response = await csrfFetch(`/api/carts`);

    if (!response.ok) {
        throw response
    }
    const carts = await response.json();
    dispatch(setCarts(carts));
    }

    const initialState = {};

    const cartsReducer = (carts = initialState, action) => {
        switch (action.type) {
            case SET_CARTS: {
                const cartsPayload = action.payload
                const newCarts = {};
                for (const cart of cartsPayload) {
                  newCarts[cart.id] = cart;
                }
                return newCarts
            }
            case REMOVE_CART: {
                const newState = {...carts};
                delete newState[action.payload];
                return newState;
            }
            case ADD_CART:
                return {...carts, [action.payload.id]: action.payload}

            default:
                return carts;
        }
    }

    export default cartsReducer;
