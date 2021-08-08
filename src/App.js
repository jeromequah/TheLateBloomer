import React, {useState, useEffect} from 'react';

// import Products from "./components/Products/Products";
// import Navbar from "./components/Navbar/Navbar";

// more scalable way of importing all components
import {Products, Navbar } from './components';
import {commerce} from "./lib/commerce";

function App() {
    const [products, setProducts] = useState([]);
    const fetchProducts = async () => {
        const {data} = await commerce.products.list();

        setProducts(data);
    }

    useEffect(() => {
        fetchProducts();
    }, [])

    return (
        <div>
            <Navbar/>
            <Products products={products}/>
        </div>
    )
}

export default App;