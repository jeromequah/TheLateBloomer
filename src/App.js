import React from 'react';

// import Products from "./components/Products/Products";
// import Navbar from "./components/Navbar/Navbar";

// more scalable way of importing all components
import {Products, Navbar } from './components';

function App() {
    return (
        <div>
            <Navbar/>
            <Products/>
        </div>
    )
}

export default App;