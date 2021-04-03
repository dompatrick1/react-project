import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState} from 'react'
import { getProducts } from '../../store/products'
import './home.css'

function ProductsHome () {
    const products = useSelector(state => state.products);
    const dispatch = useDispatch();

    const productsArray = Object.values(products)
    useEffect(() => {
        dispatch(getProducts())
    }, [dispatch]);

    let fishing = []
    let hunting = []
    let hiking = []
    let camping = []

    productsArray.forEach(product => {
        if(product.category === 'fishing') fishing.push(product)
        if(product.category === 'hunting') hunting.push(product)
        if(product.category === 'camping') camping.push(product)
        if(product.category === 'hiking') hiking.push(product)
    })

    return (
        <>
        <div className="featured-container">
            <div className="header">
                <p className="header-title">Life is either a great adventure or nothing.</p>
                <p className="subheader">Explore These Collections</p>
                <td className="categories">
                    <div>
                        <img src={'./images/header/fishing.jpg'}alt={'./images/header/fishing.jpg'}/>
                        <label>Fishing</label>
                    </div>
                    <div>
                        <img src={'./images/header/Elk1.jpg'}alt={'./images/header/Elk1.jpg'}/>
                        <label>Hunting</label>
                    </div>
                    <div>
                        <img src={'./images/header/hiking-header.jpg'}alt={'./images/header/hiking-header.jpg'}/>
                        <label>Hiking</label>
                    </div>
                    <div>
                        <img src={'./images/header/camping.jpg'}alt={'./images/header/camping.jpg'}/>
                        <label>Camping</label>
                    </div>
                </td>
            </div>
            <p className="fishing-title">Featured Fishing Products</p>
                <td className="fishing">
                    {fishing[1] ?
                        <div>
                            <a href={`/${fishing[1].id}`}>
                                <img src={fishing[1].image}alt={fishing[1].image}/>
                                <label>{fishing[1].name}</label>
                                <label className="cost">{`$${fishing[1].price}`}</label>
                            </a>
                        </div>
                    : null}
                    {fishing[2] ?
                        <div>
                            <a href={`/${fishing[2].id}`}>
                                <img src={fishing[2].image}alt={fishing[2].image}/>
                                <label>{fishing[2].name}</label>
                                <label className="cost">{`$${fishing[2].price}`}</label>
                            </a>
                        </div>
                    : null}
                    {fishing[3] ?
                        <div>
                            <a href={`/${fishing[3].id}`}>
                                <img src={fishing[3].image}alt={fishing[3].image}/>
                                <label>{fishing[3].name}</label>
                                <label className="cost">{`$${fishing[3].price}`}</label>
                            </a>
                        </div>
                    : null}
                    {fishing[4] ?
                        <div>
                            <a href={`/${fishing[4].id}`}>
                                <img src={fishing[4].image}alt={fishing[4].image}/>
                                <label>{fishing[4].name}</label>
                                <label className="cost">{`$${fishing[4].price}`}</label>
                            </a>
                        </div>
                    : null}
                </td>
                <p className="hunting-title">Featured Hunting Products</p>
                <td className="hunting">
                    {hunting[1] ?
                        <div>
                            <a href={`/${hunting[1].id}`}>
                                <img src={hunting[1].image}alt={hunting[1].image}/>
                                <label>{hunting[1].name}</label>
                                <label className="cost">{`$${hunting[1].price}`}</label>
                            </a>
                        </div>
                    : null}
                    {hunting[2] ?
                        <div>
                            <a href={`/${hunting[2].id}`}>
                                <img src={hunting[2].image}alt={hunting[2].image}/>
                                <label>{hunting[2].name}</label>
                                <label className="cost">{`$${hunting[2].price}`}</label>
                            </a>
                        </div>
                    : null}
                    {hunting[3] ?
                        <div>
                            <a href={`/${hunting[3].id}`}>
                                <img src={hunting[3].image}alt={hunting[3].image}/>
                                <label>{hunting[3].name}</label>
                                <label className="cost">{`$${hunting[3].price}`}</label>
                            </a>
                        </div>
                    : null}
                    {hunting[4] ?
                        <div>
                            <a href={`/${hunting[4].id}`}>
                                <img src={hunting[4].image}alt={hunting[4].image}/>
                                <label>{hunting[4].name}</label>
                                <label className="cost">{`$${hunting[4].price}`}</label>
                            </a>
                        </div>
                    : null}
                </td>
                <p className="hiking-title">Featured Hiking Products</p>
                <td className="hiking">
                    {hiking[1] ?
                        <div>
                            <a href={`/${hiking[1].id}`}>
                                <img src={hiking[1].image}alt={hiking[1].image}/>
                                <label>{hiking[1].name}</label>
                                <label className="cost">{`$${hiking[1].price}`}</label>
                            </a>
                        </div>
                    : null}
                    {hiking[2] ?
                        <div>
                            <a href={`/${hiking[2].id}`}>
                                <img src={hiking[2].image}alt={hiking[2].image}/>
                                <label>{hiking[2].name}</label>
                                <label className="cost">{`$${hiking[2].price}`}</label>
                            </a>
                        </div>
                    : null}
                    {hiking[3] ?
                        <div>
                            <a href={`/${hiking[3].id}`}>
                                <img src={hiking[3].image}alt={hiking[3].image}/>
                                <label>{hiking[3].name}</label>
                                <label className="cost">{`$${hiking[3].price}`}</label>
                            </a>
                        </div>
                    : null}
                    {hiking[4] ?
                        <div>
                            <a href={`/${hiking[4].id}`}>
                                <img src={hiking[4].image}alt={hiking[4].image}/>
                                <label>{hiking[4].name}</label>
                                <label className="cost">{`$${hiking[4].price}`}</label>
                            </a>
                        </div>
                    : null}
                </td>
                <p className="camping-title">Featured Camping Products</p>
                <td className="camping">
                    {camping[1] ?
                        <div>
                            <a href={`/${camping[1].id}`}>
                                <img src={camping[1].image}alt={camping[1].image}/>
                                <label>{camping[1].name}</label>
                                <label className="cost">{`$${camping[1].price}`}</label>
                            </a>
                        </div>
                    : null}
                    {camping[2] ?
                        <div>
                            <a href={`/${camping[2].id}`}>
                                <img src={camping[2].image}alt={camping[2].image}/>
                                <label>{camping[2].name}</label>
                                <label className="cost">{`$${camping[2].price}`}</label>
                            </a>
                        </div>
                    : null}
                    {camping[3] ?
                        <div>
                            <a href={`/${camping[3].id}`}>
                                <img src={camping[3].image}alt={camping[3].image}/>
                                <label>{camping[3].name}</label>
                                <label className="cost">{`$${camping[3].price}`}</label>
                            </a>
                        </div>
                    : null}
                    {camping[4] ?
                        <div>
                            <a href={`/${camping[4].id}`}>
                                <img src={camping[4].image}alt={camping[4].image}/>
                                <label>{camping[4].name}</label>
                                <label className="cost">{`$${camping[4].price}`}</label>
                            </a>
                        </div>
                    : null}
                </td>
                <div className="footer">
                    <p>Created By Dominic Patrick</p>
                </div>
        </div>
        </>
    )
}

export default ProductsHome;
