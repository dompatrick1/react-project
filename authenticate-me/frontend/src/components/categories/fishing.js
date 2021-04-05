import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState} from 'react'
import { getProducts } from '../../store/products'
// import images from './images/fishing/'

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
        <p className="fishing-category">Featured Fishing Products</p>
        <img></img>
            {fishing.length ?
                fishing.map(product => (
                    <div>
                        <td className="fishing-page">
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
export default FishingCategory;
