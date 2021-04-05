import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState} from 'react'
import { getProducts } from '../../store/products'
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
        <p className="hunting-category">Featured hunting Products</p>
            {hunting.length ?
                hunting.map(product => (
                    <div>
                        <td className="hunting-page">
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
export default HuntingCategory;
