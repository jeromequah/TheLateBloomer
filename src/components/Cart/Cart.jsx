import React from 'react';
import {Container, Grid, Typography, Button} from "@material-ui/core";
import useStyles from './styles'
import CartItem from "./CartItem/CartItem";

function Cart({cart}) {
    const classes = useStyles();

    const EmptyCart = () => {
        <Typography variant="subtitle1">Cart is Empty!</Typography>
    };

    const FilledCart = () => {
        <>
            <Grid container spacing={3}>
                {cart.line_items.map((item) => (
                    <Grid items xs={12} sm={4} key={item.id}>
                        <CartItem item={item}/>
                    </Grid>
                ))}
            </Grid>
            <div className={classes.cardDetails}>
                <Typography variant="h4">
                    Subtotal: {cart.subtotal.formatted_with_symbol}
                </Typography>
                <div>
                    <Button className={classes.emptyButton}
                            size="large" type="button" variant="contained" color="secondary">
                        Empty Cart
                    </Button>
                    <Button className={classes.checkoutButton}
                            size="large" type="button" variant="contained" color="primary">
                        Checkout
                    </Button>
                </div>
            </div>
        </>
    };

    if(!cart.line_items) return "Loading...";

    return (
        <div>
            <Container>
                <div className={classes.toolbar}/>
                <Typography className={classes.title} variant="h3" gutterBottom>Your Shopping Cart</Typography>
                {!cart.line_items.length ? <EmptyCart/> : <FilledCart/>}
            </Container>

        </div>
    )
}

export default Cart;