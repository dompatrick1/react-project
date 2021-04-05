import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState} from 'react'
import { getProducts } from '../../store/products'
// import images from './images/hiking/'

function HikingCategory () {
    const products = useSelector(state => state.products);
    const dispatch = useDispatch();

    const productsArray = Object.values(products)
    useEffect(() => {
        dispatch(getProducts())
    }, [dispatch]);

    let hiking = []



    productsArray.forEach(product => {
        if(product.category == 'hiking') {
            hiking.push(product)
        }
    })


    return (
        <>
        <p className="hiking-category">Featured hiking Products</p>
            {hiking.length ?
                hiking.map(product => (
                    <div>
                        <td className="hiking-page">
                            <div>
                                {product ?
                                    <a href={`/${product.id}`}>
                                        <img src={require(`${product.image}`).default}alt={''}/>
                                        <label>{product.name}</label>
                                        <label className="cost">{`$${product.price}`}</label>
                                    </a>
                                : null}
                            </div>
                        </td>
                    </div>
                ))
            : null}

        </>
    )
}
export default HikingCategory;
