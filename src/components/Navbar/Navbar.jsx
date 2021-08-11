import React from 'react';
import {AppBar, Badge, IconButton, Toolbar, Typography} from "@material-ui/core";
import {ShoppingCart} from "@material-ui/icons";
import Logo from '../../assets/ColorLogo.jpg'
import {Link, useLocation} from 'react-router-dom';

import useStyles from './styles';

function Navbar({totalItems}) {
    const classes = useStyles();
    const location = useLocation();

    return (
        <>
            <AppBar position="fixed" className={classes.appBar} color="inherit">
                <Toolbar>
                    <Typography component={Link} to="/" variant="h6" className={classes.title} color="inherit">
                        <img src={Logo} alt="The Late Bloomer" height="25px" className={classes.image}/>
                        The Late Bloomer
                    </Typography>
                    <div className={classes.grow}/>
                    {location.pathname === '/' && (
                        <div className={classes.button}>
                            <IconButton component={Link} to="/cart" aria-label="Show Cart Items" color="inherit">
                                <Badge badgeContent={totalItems} color="secondary">
                                    <ShoppingCart/>
                                </Badge>
                            </IconButton>
                        </div>)}
                </Toolbar>
            </AppBar>
        </>
    )
}

export default Navbar;