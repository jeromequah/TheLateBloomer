import React, {useEffect, useState} from 'react';
import {
    Button,
    CircularProgress,
    CssBaseline,
    Divider,
    Paper,
    Step,
    StepLabel,
    Stepper,
    Typography
} from "@material-ui/core";
import {Link, useHistory} from 'react-router-dom';

import useStyles from './styles'
import AddressForm from "../AddressForm";
import PaymentForm from "../PaymentForm";

import {commerce} from "../../../lib/commerce";

const steps = ['Shipping Address', 'Payment Details'];

function Checkout({cart, order, onCaptureCheckout, error}) {
    const [activeStep, setActiveStep] = useState(0);
    const [checkoutToken, setCheckoutToken] = useState(null);
    const [shippingData, setShippingData] = useState({});
    const [isFinished, setIsFinished] = useState(false);
    const classes = useStyles();
    const history = useHistory();

    useEffect(() => {
        if (cart.id) {
            const generateToken = async () => {
                try {
                    const token = await commerce.checkout.generateToken(cart.id, {type: 'cart'})
                    setCheckoutToken(token);
                } catch (error) {
                    history.push('/')
                }
            };
            generateToken();
        }
    }, [cart, history]);

    const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1
    );

    const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1
    );

    const next = (data) => {
        setShippingData(data);
        nextStep();
        console.log(data);
    }

    const timeout = () => {
        setTimeout(() => {
            setIsFinished(true)
        }, 10000);
    }

    const Form = () => (activeStep === 0
        ? <AddressForm checkoutToken={checkoutToken} next={next} setShippingData={setShippingData} nextStep={nextStep}/>
        : <PaymentForm
            shippingData={shippingData}
            checkoutToken={checkoutToken}
            backstep={backStep}
            onCaptureCheckout={onCaptureCheckout}
            nextStep={nextStep}
            timeout={timeout}/>);

    let Confirmation = () => (order.customer ? (
        <>
            <div>
                <Typography variant="h5">
                    Hey {order.customer.firstname} {order.customer.lastname}, thank you for your purchase!
                </Typography>
                <Divider className={classes.divider}/>
                <Typography variant="subtitle2">Order Ref: {order.customer.reference}</Typography>
            </div>
            <br/>
            <Button component={Link} to="/" variant="outlined" type="button">Back to Home!</Button>
        </>
    ) : isFinished ? (
            <>
                <div>
                    <Typography variant="h5">
                        Thank you for your purchase!
                    </Typography>
                    <Divider className={classes.divider}/>
                </div>
                <br/>
                <Button component={Link} to="/" variant="outlined" type="button">Back to Home!</Button>
            </>
        ) :
        (
            <div className={classes.spinner}>
                <CircularProgress/>
            </div>
        ));

    if (error) {
        Confirmation = () => (
            <>
                <Typography variant="h5">Error: {error}</Typography>
                <br/>
                <Button component={Link} to="/" variant="outlined" type="button">Back to Home!</Button>
            </>
        );
    }

    return (
        <>
            <CssBaseline/>
            <div className={classes.toolbar}/>
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography variant="h4" align="center">Checkout</Typography>
                    <Stepper activeStep={activeStep} className={classes.stepper}>
                        {steps.map((step) => (
                            <Step key={step}>
                                <StepLabel>{step}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    {activeStep === steps.length ? <Confirmation/> : checkoutToken && <Form/>}
                </Paper>
            </main>
        </>
    )
}

export default Checkout;