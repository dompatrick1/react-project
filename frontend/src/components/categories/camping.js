import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState} from 'react'
import { getProducts } from '../../store/products'
// import images from './images/camping/'

function CampingCategory () {
    const products = useSelector(state => state.products);
    const dispatch = useDispatch();

    const productsArray = Object.values(products)
    useEffect(() => {
        dispatch(getProducts())
    }, [dispatch]);

    let camping = []



    productsArray.forEach(product => {
        if(product.category == 'camping') {
            camping.push(product)
        }
    })


    return (
        <>
        <div className="category-container">
            {camping.length ?
                camping.map(product => (
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
        </>
    )
}
export default CampingCategory;
