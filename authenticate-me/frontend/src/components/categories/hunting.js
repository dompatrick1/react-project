import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState} from 'react'
import { getProducts } from '../../store/products'
import './categories.css'
// import images from './images/hunting/'

function HuntingCategory () {
    const products = useSelector(state => state.products);
    const dispatch = useDispatch();

    const productsArray = Object.values(products)
    useEffect(() => {
        dispatch(getProducts())
    }, [dispatch]);

    let hunting = []



    productsArray.forEach(product => {
        if(product.category == 'hunting') {
            hunting.push(product)
        }
    })


    return (
        <>
        <div className="category-container">
            {hunting.length ?
                hunting.map(product => (
                    <div className="individual-product">
                        {product ?
                            <a href={`/${product.id}`}>
                                <img src={require(`${product.image}`).default}alt={''}/>
                                <label>{product.name}</label>
                                <label className="cost">{`$${product.price}`}</label>
                            </a>
                        : null}
                    </div>
                ))
            : null}
        </div>
        <div className="footer-categories">
            <p>Created By Dominic Patrick</p>
        </div>
        </>
    )
}
export default HuntingCategory;
