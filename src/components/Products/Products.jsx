import React from 'react';
import {Grid} from '@material-ui/core';
import Product from "./Product/Product";

import useStyles from './styles'
import HeartLocket from '../../assets/HeartLocket.jpeg'
import Wallflower from '../../assets/WallMount.jpeg'

// dummy products
const products = [
    {
        id: 1,
        name: 'Heart Locket',
        description: 'A simple yet elegant gift for anyone.',
        price: '$10',
        image: HeartLocket
    },
    {
        id: 2,
        name: 'Wallflower',
        description: 'Perks of having a wallflower? Beauty.',
        price: '$28',
        image: Wallflower
    },
]

function Products() {
    const classes = useStyles();

    return (
        <main className={classes.content}>
            <div className={classes.toolbar}/>
            <Grid container justify="center" spacing={4}>
                {products.map((product) => (
                    <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                        <Product product={product}/>
                    </Grid>
                ))}
            </Grid>
        </main>
    )
}

export default Products;