import React, {useEffect, useState} from 'react';
import {Grid, InputLabel, MenuItem, Select, Typography} from "@material-ui/core";
import {FormProvider, useForm} from 'react-hook-form';
import FormInput from "./CustomTextField";

import {commerce} from "../../lib/commerce";

function AddressForm({checkoutToken}) {
    const methods = useForm();

    const [shippingCountries, setShippingCountries] = useState([]);
    const [shippingCountry, setShippingCountry] = useState('');
    const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
    const [shippingSubdivision, setShippingSubdivision] = useState('');
    const [shippingOptions, setShippingOptions] = useState([]);
    const [shippingOption, setShippingOption] = useState('');

    const countries = Object.entries(shippingCountries).map(([code, name]) => ({id:code, label:name}))
    console.log(countries)

    const fetchShippingCountries = async (checkoutTokenId) => {
        const {countries} = await commerce.services.localeListShippingCountries(checkoutTokenId)

        console.log(countries);
        setShippingCountries(countries);
        setShippingCountry(Object.keys(countries)[0])
    }

    useEffect(() => {
        fetchShippingCountries(checkoutToken.id)
    }, [])

    return (
        <>
            <Typography variant="h6" gutterBottom>Shipping Address</Typography>
            <FormProvider {...methods}>
                <form onSubmit=''>
                    <Grid container spacing={3}>
                        <FormInput required name='firstName' label='First name'/>
                        <FormInput required name='lastName' label='Last name'/>
                        <FormInput required name='address' label='Address'/>
                        <FormInput required name='email' label='Email'/>
                        <FormInput required name='city' label='City'/>
                        <FormInput required name='postalCode' label='Postal Code'/>
                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Country</InputLabel>
                            <Select value={shippingCountry} fullWidth onChange={(e) => setShippingCountry(e.target.value)}>
                                {countries.map((country) => (
                                    <MenuItem key={country.id} value={country.id}>
                                        {country.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Grid>
                        {/*<Grid item xs={12} sm={6}>*/}
                        {/*    <InputLabel>Shipping Subdivision</InputLabel>*/}
                        {/*    <Select value={} fullWidth onChange={}>*/}
                        {/*        <MenuItem key={} value={}>*/}
                        {/*            Choice 2*/}
                        {/*        </MenuItem>*/}
                        {/*    </Select>*/}
                        {/*</Grid>*/}
                        {/*<Grid item xs={12} sm={6}>*/}
                        {/*    <InputLabel>Shipping Options</InputLabel>*/}
                        {/*    <Select value={} fullWidth onChange={}>*/}
                        {/*        <MenuItem key={} value={}>*/}
                        {/*            Choice 3*/}
                        {/*        </MenuItem>*/}
                        {/*    </Select>*/}
                        {/*</Grid>*/}
                    </Grid>
                </form>
            </FormProvider>
        </>
    );
}

export default AddressForm;