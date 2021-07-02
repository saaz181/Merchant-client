import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import {
    Container,
    Grid,
    Typography
} from '@material-ui/core'
import TextField from './FormUI/TextField';
import Select from './FormUI/Select';
import DateTimePicker from './FormUI/DateTimePicker';
import Checkbox from './FormUI/CheckBox';
import Button from './FormUI/Button';
import countries from '../data/countries.json';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { orderInfo } from '../actions';
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    formWrapper: {
        marginTop: theme.spacing(5),
        marginBottom: theme.spacing(8)
    },

}));



const INITIAL_FORM_STATE = {
    firstName: '',
    lastName: '',
    fullAddress: '',
    // email: '',
    zipCode: '',
    phone: '',
    city: '',
    state: '',
    country: '',
    // arrivalDate: '',
    // departureDate: '',
    // message: '',
    termsOfService: false,
};

// our validation schema
const FORM_VALIDATION = Yup.object().shape({
    firstName: Yup.string()
        .required('*Required'),
    lastName: Yup.string()
        .required('*Required'),

    fullAddress: Yup.string()
        .required('*Required'),

    // email: Yup.string()
    //     .email('Invalid Email')
    //     .required('*Required'),

    zipCode: Yup.number()
        .integer()
        .typeError('Please Enter valid zip code')
        .required('*Required'),

    phone: Yup.number()
        .integer()
        .typeError('Please Enter valid phone number')
        .required('*Required'),

    city: Yup.string()
        .required('*Required'),

    state: Yup.string()
        .required('*Required'),

    country: Yup.string()
        .required('*Required'),

    // arrivalDate: Yup.date()
    //     .required('*Required'),

    // departureDate: Yup.date()
    //     .required('*Required'),

    // message: Yup.string(),

    termsOfService: Yup.boolean()
        .oneOf([true], "The terms and conditions must be accepted")
        .required('The terms and conditions must be accepted'),
});


function Orders() {
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();

    const postData = async (data) => {
        const formData = new FormData();
        formData.append('first_name', data.firstName);
        formData.append('last_name', data.lastName);
        formData.append('zip_code', data.zipCode);
        formData.append('phone', data.phone);
        formData.append('country', data.country);
        formData.append('state', data.state);
        formData.append('city', data.city);
        formData.append('address', data.fullAddress);
    
        await axios.post('/api/order-info', formData)
            .then(res => dispatch(orderInfo(res.data)));
    }

    return (
        <Grid container style={{ height: '100vh', overflowY: 'scroll' }}>
            <Grid item xs={12} />

            <Grid item xs={12}>
                <Container maxWidth='md'>
                    <div className={classes.formWrapper}>

                        <Formik
                            initialValues={{
                                ...INITIAL_FORM_STATE
                            }}
                            validationSchema={FORM_VALIDATION}
                            onSubmit={(values, {setSubmitting}) => {
                                setSubmitting(true);
                                
                                postData(values);
                                history.push('/checkout')
                                
                                setSubmitting(false);
                            }}
                        >
                            <Form>
                                <Grid container spacing={2}>

                                    <Grid item xs={12}>
                                        <Typography>
                                            Details
                                        </Typography>
                                    </Grid>

                                    <Grid item xs={6}>
                                        <TextField
                                            name="firstName"
                                            label="First Name"
                                            placeholder="First Name"
                                        />
                                    </Grid>

                                    <Grid item xs={6}>
                                        <TextField
                                            name="lastName"
                                            label="Last Name"
                                            placeholder="Last Name"
                                        />
                                    </Grid>

                                    {/* <Grid item xs={6}>
                                        <TextField 
                                            name="email"
                                            label="Email"
                                            placeholder="Email"
                                        />
                                    </Grid> */}
                                    <Grid item xs={3} />
                                    <Grid item xs={6}>
                                        <TextField
                                            name="phone"
                                            label="Phone"
                                            placeholder="Phone"
                                        />
                                    </Grid>
                                    <Grid item xs={3} />

                                    <Grid item xs={12}>
                                        <Typography>
                                            Address
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            name="fullAddress"
                                            label="Address"
                                            placeholder="Address"
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            name="zipCode"
                                            label="Zip Code"
                                            placeholder="Zip-Code"
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            name="city"
                                            label="City"
                                            placeholder="City"
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            name="state"
                                            label="State"
                                            placeholder="State"
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Select
                                            name="country"
                                            label="Country"
                                            options={countries}
                                        />
                                    </Grid>

                                    {/*
                                    <Grid item xs={12}>
                                        <Typography>
                                            Booking Info
                                        </Typography>
                                    </Grid>

                                     <Grid item xs={6}>
                                        <DateTimePicker 
                                            name="arrivalDate"
                                            label="order Date"
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <DateTimePicker 
                                            name="departureDate"
                                            label="receiving Date"
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <TextField 
                                            name="message"
                                            label="Message"
                                            multiline={true}
                                            rows={4}
                                        />
                                    </Grid> */}

                                    <Grid item xs={12}>
                                        <Checkbox
                                            name="termsOfService"
                                            legend="Terms of Service"
                                            label="I agree"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button>
                                            Submit
                                            </Button>
                                    </Grid>

                                </Grid>

                            </Form>
                        </Formik>

                    </div>
                </Container>
            </Grid>
        </Grid>
    )
}

export default Orders
