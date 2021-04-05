import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState} from 'react'
import { getProducts } from '../../store/products'
import './categories.css'

function FishingCategory () {
    const products = useSelector(state => state.products);
    const dispatch = useDispatch();

    const productsArray = Object.values(products)
    useEffect(() => {
        dispatch(getProducts())
    }, [dispatch]);

    let fishing = []



    productsArray.forEach(product => {
        if(product.category == 'fishing') {
            fishing.push(product)
        }
    })


    return (
        <>
        <div className="category-container">
                {fishing.length ?
                    fishing.map(product => (
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
export default FishingCategory;
