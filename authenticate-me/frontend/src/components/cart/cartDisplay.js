import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {getProducts} from '../../store/products'
import CartItems from './cartItems'

function CartDisplay () {
    const products = useSelector(state => state.products);
    const dispatch = useDispatch();

    const productsArray = Object.values(products)
    useEffect(() => {
        dispatch(getProducts())
    }, [dispatch])

    return (
        <>
            <CartItems products={productsArray}/>
        </>
    )
}

export default CartDisplay;
