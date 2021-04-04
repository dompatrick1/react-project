import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {createCart, deleteCart} from '../../store/carts'

function CreateCartForm () {
    const {productId} = useParams()
    const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const [submitButton, setSubmitButton] = useState('')

    if (sessionUser) {
        let userId = sessionUser.id
        const handleSubmit = async (e) => {
            e.preventDefault();

            const payload = {
                userId,
                productId
            };
            const userCart = await dispatch(createCart(payload));
            setSubmitButton("true")
        }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <button type="submit" hidden={submitButton} >Add To Cart</button>
            </form>
        </>
    )

} else {
    return (
        <p>Login to add items to your cart!</p>
    )
}
}

export default CreateCartForm;
