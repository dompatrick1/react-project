
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState} from 'react'
import ProductReviews from '../reviews/productReviews'
import {getUsers} from '../../store/users'


function ReturnUsers ({review}) {
    const users = useSelector(state => state.users)
    const dispatch = useDispatch();

    const usersList = Object.values(users)

    const userId = review.userId
    let userName;

    usersList.map(user => {
        if (user.id === userId) {
            userName = user.username
        }
    })


    useEffect(() => {
        dispatch(getUsers())
    }, [dispatch])

    return (
        <>
            <h1>{userName}</h1>
        </>
    )
}

export default ReturnUsers;
