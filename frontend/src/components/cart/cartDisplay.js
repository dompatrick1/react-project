import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {getCarts, deleteCart} from '../../store/carts'
import CartItems from './cartItems'

function CartDisplay () {
    const cartList = useSelector(state => state.carts)
    const dispatch = useDispatch();


    let cartListArray = Object.values(cartList)
    useEffect(() => {
        dispatch(getCarts())
    }, [dispatch])

    return (
        <>
            <CartItems carts={cartListArray}/>
        </>
    )
}

export default CartDisplay;
