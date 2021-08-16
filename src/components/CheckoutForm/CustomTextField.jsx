import React from 'react';
import {Grid, TextField} from "@material-ui/core";
import {Controller, useFormContext} from 'react-hook-form';

function FormInput({name, label, required}) {
    const {control} = useFormContext();

    return (
        <Grid item xs={12} sm={6}>
            <Controller
                name={name}
                control={control}
                required={required}
                render={
                    ({field}) => (
                        <TextField
                            {...field}
                            label={label}
                            fullWidth
                        />
                    )}
            />
        </Grid>
    );
}

export default FormInput;