import React, {useEffect, useState} from 'react';

// import Products from "./components/Products/Products";
// import Navbar from "./components/Navbar/Navbar";
// more scalable way of importing all components
import {Cart, Navbar, Products} from './components';
import {commerce} from "./lib/commerce";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

function App() {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState({});


    const fetchProducts = async () => {
        const {data} = await commerce.products.list();

        setProducts(data);
    }

    const fetchCart = async () => {
        setCart(await commerce.cart.retrieve());
    }

    const handleAddToCart = async (productId, quantity) => {
        const item = await commerce.cart.add(productId, quantity);
        setCart(item.cart)
    }

    useEffect(() => {
        fetchProducts();
        fetchCart();
    }, [])

    console.log(cart)

    return (
        <Router>
            <div>
                <Navbar totalItems={cart.total_items}/>
                <Switch>
                    <Route exact path="/">
                        <Products products={products} onAddToCart={handleAddToCart}/>
                    </Route>
                    <Route exact path="/cart">
                        <Cart cart={cart}/>
                    </Route>
                </Switch>
            </div>
        </Router>
    )
}

export default App;