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
                    total = total + Number(item.price)
                }
            })
        })
        console.log('this is the total', total)
        const handleDelete = async (e, product) => {
            // e.preventDefault()
            cartsList.forEach(cart => {
                if (cart.productId === product.id) {
                    dispatch(deleteCart(cart.id))
                }
            })
            window.location.reload(false);
        }

    return (
        <>
            {final.map(product => {
                return (
                    <div className="cart-container">
                        {product ?
                            <div className="individual-cart">
                                <a href={`/${product.id}`}>
                                    <img src={require(`${product.image}`).default} alt={''}/>
                                    <p>{product.name}</p>
                                    <label className="cost">{`$${product.price}`}</label>
                                </a>
                                <button onClick={(e) => handleDelete(e, product)}>X</button>
                            </div>
                        : null}
                    </div>
                )
            })}
            <p className="cart-total">{`Total: ${total}`}</p>
            <p className="checkout-button">
                <button>CHECKOUT</button>
            </p>
        </>
    )

}

export default CartItems;
