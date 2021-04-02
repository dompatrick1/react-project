import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState} from 'react'
import { useParams } from 'react-router-dom';
import { getProducts } from '../../store/products'
import fish from '../../images/fish.jpg'
import CreateReviewForm from '../reviews/createReview'
import ProductReviews from '../reviews/productReviews'
import './product.css'


function Product () {
    const { productId } = useParams();
    const product = useSelector(state => state.products[productId]);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProducts(productId))
    }, [dispatch, productId]);

    return (
        <>
        <div className="product-detail-container">
            <div className="product-header">
                <p className="product-header-title">FISHING PRODUCTS</p>
                <img src={fish}alt={fish}/>
            </div>
            {product ?
                <div className="product-image">
                    <img src={product.image}alt={product.image}/>
                </div>
            : null}
            {product ?
                <div className="product-name">
                    <p>{product.name}</p>
                </div>
            : null}
            {product ?
                <div className="product-description">
                    <p>{product.description}</p>
                </div>
            : null}
            {product ?
                <div className="product-price">
                    <p>{`$${product.price}`}</p>
                </div>
            : null}
            <div>
                <CreateReviewForm />
            </div>
            <div>
                <ProductReviews />
            </div>
        </div>
        </>
    )
}

export default Product;
