import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState} from 'react'
import { useParams } from 'react-router-dom';
import { getProducts } from '../../store/products'
import fishing from '../../images/fish.jpg'
import hunting from '../../images/deer.jpg'
import hiking from '../../images/hike.jpg'
import camping from '../../images/camp.jpg'
import CreateReviewForm from '../reviews/createReview'
import CreateCartForm from '../cart/addToCart'
// import ProductReviews from '../reviews/productReviews'
import './product.css'


function Product () {
    const { productId } = useParams();
    const product = useSelector(state => state.products[productId]);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProducts(productId))
    }, [dispatch, productId]);

    let headerImage;

    if (product && product.category === "fishing") {
        headerImage = (
            <>
                <div className="product-header">
                    {product ?
                    <>
                        <a href={`/category/fishing`}>
                            <p className="product-header-title">FISHING PRODUCTS</p>
                            <img src={fishing}alt={fishing}/>
                        </a>
                    </>
                    : null}
                </div>
            </>
        )
    } else if (product && product.category === "hunting") {
        headerImage = (
            <>
                <div className="product-header">
                    {product ?
                    <>
                        <a href={"/category/hunting"}>
                            <p className="product-header-title">HUNTING PRODUCTS</p>
                            <img src={hunting}alt={hunting}/>
                        </a>
                    </>
                    : null}
                </div>
            </>
        )
    } else if (product && product.category === "hiking") {
        headerImage = (
            <>
                <div className="product-header">
                    {product ?
                    <>
                        <a href={"/category/hiking"}>
                            <p className="product-header-title">HIKING PRODUCTS</p>
                            <img src={hiking}alt={hiking}/>
                        </a>
                    </>
                    : null}
                </div>
            </>
        )
    } else if (product && product.category === "camping") {
        headerImage = (
            <>
                <div className="product-header">
                    {product ?
                    <>
                        <a href={"/category/camping"}>
                            <p className="product-header-title">CAMPING PRODUCTS</p>
                            <img src={camping}alt={camping}/>
                        </a>
                    </>
                    : null}
                </div>
            </>
        )
    }

    return (
        <>
        <div className="product-detail-container">
            {headerImage}
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
            {/* <div className="add-to-cart">
                <CreateCartForm />
            </div> */}
            <div className="add-review">
                <CreateReviewForm />
            </div>
            <td className="add-to-cart">
                <CreateCartForm />
            </td>
        </div>
        <div className="footer-categories">
            <p>Created By Dominic Patrick</p>
        </div>
        </>
    )
}

export default Product;
