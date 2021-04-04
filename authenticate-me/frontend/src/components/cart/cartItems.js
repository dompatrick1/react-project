import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {getCarts, deleteCart} from '../../store/carts'
// import '../../../public'


function CartItems ({products}) {
    const sessionUser = useSelector(state => state.session.user);
    const cartList = useSelector(state => state.carts)
    const dispatch = useDispatch();
    const [count, setCount] = useState(1);
    // const [items, setItems] = useState([])


    let cartListArray = Object.values(cartList)

    let productsList = [];

    products.forEach(product => {
            productsList.push(product)

        })

        let final = []

        productsList.forEach(product => {
            cartListArray.forEach(item => {
                if (item.productId === product.id && item.userId === sessionUser.id) {
                    final.push(product)
                }
            })
        })


    useEffect(() => {
        dispatch(getCarts())
    }, [dispatch])

    return (
        <div className="cart-container">
            {final.map(product => {
                console.log(product)
                return (
                    <div>
                        {product ?
                            <a>
                                <img src={product.image} alt={product.image}/>
                                <p>{product.name}</p>
                                <label className="cost">{`$${product.price}`}</label>
                            </a>
                        : null}
                        <input
                            type="number"
                            value={count}
                            onChange={(e) => setCount(e.target.value)}
                            />
                            <button
                            className="cart-item-button"
                            onClick={() => setCount(count + 1)}
                            >
                            +
                            </button>
                            <button
                            className="cart-item-button"
                            onClick={() => setCount(count - 1)}
                            >
                            -
                            </button>
                    </div>
                )
            })}
        </div>
    )

}

export default CartItems;
