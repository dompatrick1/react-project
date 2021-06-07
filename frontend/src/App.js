import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import ProductsHome from './components/home'
import Product from './components/product'
import CreateReviewForm from './components/reviews/createReview'
import CartDisplay from "./components/cart/cartDisplay";
import FishingCategory from "./components/categories/fishing";
import HuntingCategory from "./components/categories/hunting";
import CampingCategory from "./components/categories/camping";
import HikingCategory from "./components/categories/hiking";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/login">
            <LoginFormPage />
          </Route>
          <Route exact path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path='/'>
            <ProductsHome />
          </Route>
          <Route exact path="/:productId">
            <Product />
          </Route>
          <Route exact path="/cart/:userId">
            <CartDisplay />
          </Route>
          <Route exact path="/category/fishing">
            <FishingCategory />
          </Route>
          <Route exact path="/category/hunting">
            <HuntingCategory />
          </Route>
          <Route exact path="/category/camping">
            <CampingCategory />
          </Route>
          <Route exact path="/category/hiking">
            <HikingCategory />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
