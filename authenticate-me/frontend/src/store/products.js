import { csrfFetch } from './csrf.js';


const SET_PRODUCTS = 'products/set'
const ADD_PRODUCT = 'products/add'

//Actions
export const setProducts = (products) => {
  return {
    type: SET_PRODUCTS,
    payload: products
  }
}
export const addProducts = (products) => {
  return {
    type: ADD_PRODUCT,
    payload: products
  }
}

//Thunks (Async Actions)
export const getProducts = () => async dispatch => {
  const response = await csrfFetch('/api/products');

  if(!response.ok) {
      throw response;
  }
  const products = await response.json();
  dispatch(setProducts(products))
}

//Reducer
const initialState = {}

const productReducer = (products = initialState, action) => {
    switch (action.type) {
      case SET_PRODUCTS: {
        const productsPayload = action.payload
        const newProducts = {};
        for (const product of productsPayload) {
          newProducts[product.id] = product;
        }
        return newProducts
      }
      case ADD_PRODUCT:
        return
      default:
        return products
    }
}

export default productReducer;
