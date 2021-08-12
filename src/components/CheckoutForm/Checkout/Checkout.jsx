import React, {useState} from 'react';
import {Paper, Step, StepLabel, Stepper, Typography} from "@material-ui/core";

import useStyles from './styles'
import AddressForm from "../AddressForm";
import PaymentForm from "../PaymentForm";
import Confirmation from "../Confirmation";

const steps = ['Shipping Address', 'Payment Details'];

function Checkout() {
    const [activeStep, setActiveStep] = useState(2);
    const classes = useStyles();

    const Form = () => activeStep === 0
        ? <AddressForm/> : <PaymentForm/>

    return (
        <>
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
                    {activeStep === steps.length ? <Confirmation/> : <Form/>}
                </Paper>
            </main>
        </>
    )
}

export default Checkout;