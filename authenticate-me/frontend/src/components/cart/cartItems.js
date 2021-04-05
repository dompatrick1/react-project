import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {deleteCart} from '../../store/carts'
import {getProducts} from '../../store/products'
import './cart.css'
// import '../../../public'


function CartItems ({carts}) {
    const sessionUser = useSelector(state => state.session.user);
    const products = useSelector(state => state.products);
    const dispatch = useDispatch();
    const [count, setCount] = useState(1);
    // const [items, setItems] = useState([])


    const productsArray = Object.values(products)
    useEffect(() => {
        dispatch(getProducts())
    }, [dispatch])

    let cartsList = [];

    carts.forEach(cart => {
            cartsList.push(cart)

        })

        let final = []
        let total = 0
        cartsList.forEach(cart => {
            productsArray.forEach(item => {
                if (cart.productId === item.id && cart.userId === sessionUser.id) {
                    final.push(item)
                    total += item.price
                }
            })
        })
        const handleDelete = async (e, product) => {
            // e.preventDefault()
            cartsList.forEach(cart => {
                if (cart.productId === product.id) {
                    dispatch(deleteCart(cart.id))
                }
            })
            window.location.reload(false);
        }

    // return (
    //     <>
            return final.map(product => {
                return (
                    <td className="cart-container">
                        {product ?
                            <div>
                                <a href={`/${product.id}`}>
                                    <img src={require(`${product.image}`).default} alt={''}/>
                                    <p>{product.name}</p>
                                    <label className="cost">{`$${product.price}`}</label>
                                </a>
                                <button onClick={(e) => handleDelete(e, product)}>X</button>
                            </div>
                        : null}
                    </td>
                )
            })
    //     </>
    // )

}

export default CartItems;
