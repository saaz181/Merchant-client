import React from 'react';
import {TextField, MenuItem} from '@material-ui/core';
import {useField, useFormikContext} from 'formik';


const SelectWrapper = ({
    name, 
    options,
    ...otherProps
}) => {
    const { setFieldValue } = useFormikContext();
    const [field, meta] = useField(name);

    const handleChange = event => {
        const { value } = event.target;
        setFieldValue(name, value);
    };

    const configSelect = {
        ...field,
        ...otherProps,
        select: true,
        variant: 'outlined',
        fullWidth: true,
        onChange: handleChange 
    };

    if (meta && meta.touched && meta.error) {
        configSelect.error = true;
        configSelect.helperText = meta.error;
    }

    return (
        <TextField {...configSelect} >
            {Object.keys(options).map((item, position) => {
                return (
                    <MenuItem key={position} value={options[item]}>
                        {options[item]}
                    </MenuItem>
                );
            })}
        </TextField>
    );
};

export default SelectWrapper;
