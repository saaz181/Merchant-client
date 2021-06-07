import React, { Component, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { 
    Grid, 
    Typography, 
    Button,
    } from "@material-ui/core";
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import FormHelperText from '@material-ui/core/FormHelperText';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AddIcCallIcon from '@material-ui/icons/AddIcCall';
import AddLocationIcon from '@material-ui/icons/AddLocation';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import { Alert } from '@material-ui/lab';


const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
        },
    },
    inputFeilds: {
        marginTop: 20,
        marginBottom: 20
    },
    input: {
        display: 'none',
      },
      button: {
        margin: theme.spacing(1),
      },
    rootInput: {
        '& > *': {
            margin: theme.spacing(1),
          },
      },
      inputCreditCard: {
          width: '100%',
      }, 
      alertStyle: {
        position: 'relative',  
        top: '-200px', 
        marginTop: '0px'
      }
    }));


export default function MerchantPage (props) {
    const classes = useStyles();
    const [inCompanyName, setCompanyName] = useState(false);
    const [info, setInfo] = useState({
        companyName: '', 
        firstName: '',
        lastName: '', 
        email: '',
        phone: '',
        address: '',
        country: '',
        province: '',
        city: '',
        creditCard: '',
        shabaCode: '',
        merchant_id: ''
    });
    const [res, setRes] = useState(null);

    const handleChange = event => {
        const value = event.target.value;
        setInfo({
            ...info,
            [event.target.name]: value
        });
        // console.log(info);
    }

    const logo = () => {

        const handleFileChange = event => {
           setLogoPic(event.target.files[0]);
           console.log(event.target.files);
        }

        return (
            <Grid container spacing={5} alignItems='center'>
                <Grid item xs={12} align='center'>
                    <Typography variant='subtitle1' color='secondary'>
                        Choose a Logo For Your Company
                    </Typography>
                </Grid>
                <Grid item xs={12} align='center'>
                    <div className={classes.rootInput}>
                    <input
                        accept="image/*"
                        name='image'
                        className={classes.input}
                        id="contained-button-file"
                        type="file"
                        onChange={handleFileChange}

                    />
                    <label htmlFor="contained-button-file">
                        <Button variant="contained" color="primary" component="span" onChange={handleFileChange}>
                        Upload Logo
                        </Button>
                    </label>
                    </div>
            </Grid>
        </Grid>
        );
    }


    const location = () => {
        function countryToFlag(isoCode) {
            return typeof String.fromCodePoint !== 'undefined'
              ? isoCode
                  .toUpperCase()
                  .replace(/./g, (char) => String.fromCodePoint(char.charCodeAt(0) + 127397))
              : isoCode;
          }

        

        return (
        <Grid container spacing={4} alignItems='center'>
            <Grid item xs={12} align='center'>
            <Autocomplete
                id="country-select-demo"
                name='country'
                style={{ width: 300 }}
                options={countries}
                classes={{
                    option: classes.option,
                }}
                autoHighlight
                onChange={(event, value) => setInfo({...info, country: value.label})}
                getOptionLabel={(option) => option.label}
                renderOption={(option) => (
        
        <React.Fragment>
          <span>{countryToFlag(option.code)}</span>
          {option.label} ({option.code}) +{option.phone}
        </React.Fragment>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Choose a country"
          variant="outlined"
          inputProps={{
            ...params.inputProps,
            autoComplete: 'new-password', // disable autocomplete and autofill
          }}
        />
      )}
    />
            </Grid>
            <Grid item xs={12} align='center'>
            <Autocomplete
                id="province-choices"
                options={provinces}
                onChange={(event, value) => setInfo({...info, province: value.title})}
                name='province'
                getOptionLabel={(option) => option.title}
                style={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="province" variant="outlined" />}
                placeholder='province'
                />
            </Grid>
            <Grid item xs={12} align='center'>
            <FormControl className={classes.margin}>
                            <InputLabel htmlFor="input-with-icon-adornment">City</InputLabel>
                                <Input
                                id="city-name"
                                name='city'
                                onChange={handleChange}
                                startAdornment={
                                    <InputAdornment position="start">
                                    <AccountCircleIcon />
                                    </InputAdornment>
                                }
                                placeholder="City"
                                />
                        </FormControl>
            </Grid>
        </Grid>
        );
    }

    const CreateMainInfo = () => {
        return (
            <Grid container spacing={2} alignItems='center'>
                    <Grid item xs={6} align='center'>
                        <FormControl className={classes.margin}>
                            <InputLabel htmlFor="input-with-icon-adornment">First Name</InputLabel>
                                <Input
                                id="input-first-name"
                                startAdornment={
                                    <InputAdornment position="start">
                                    <AccountCircleIcon />
                                    </InputAdornment>
                                }
                                placeholder="First Name"
                                name='firstName'
                                onChange={handleChange}
                                />
                        </FormControl>
                    </Grid>
                    <Grid item xs={6} align='center'>
                        <FormControl className={classes.margin}>
                            <InputLabel htmlFor="input-with-icon-adornment">Last Name</InputLabel>
                                <Input
                                id="input-last-name"
                                startAdornment={
                                    <InputAdornment position="start">
                                    <AccountCircleIcon />
                                    </InputAdornment>
                                }
                                placeholder="Last Name"
                                name='lastName'
                                onChange={handleChange}
                                />
                        </FormControl>
                    </Grid>
                    <Grid item xs={6} align='center'>
                        <FormControl className={classes.margin}>
                            <InputLabel htmlFor="input-with-icon-adornment">Email</InputLabel>
                                <Input
                                id="input-email"
                                startAdornment={
                                    <InputAdornment position="start">
                                    <AlternateEmailIcon />
                                    </InputAdornment>
                                }
                                placeholder="Email"
                                name='email'
                                onChange={handleChange}
                                />
                        </FormControl>
                    </Grid>
                    <Grid item xs={6} align='center'>
                        <FormControl className={classes.margin}>
                            <InputLabel htmlFor="input-with-icon-adornment">Phone</InputLabel>
                                <Input
                                id="input-phone"
                                startAdornment={
                                    <InputAdornment position="start">
                                    <AddIcCallIcon />
                                    </InputAdornment>
                                }
                                placeholder="Phone"
                                name='phone'
                                onChange={handleChange}
                                />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} align='center' style={{width: '100%'}}>
                        <FormControl className={classes.margin}>
                            <InputLabel htmlFor="input-with-icon-adornment">Address</InputLabel>
                                <Input
                                fullWidth={true}
                                id="input-address"
                                startAdornment={
                                    <InputAdornment position="start">
                                    <AddLocationIcon />
                                    </InputAdornment>
                                }
                                placeholder="Address"
                                name='address'
                                onChange={handleChange}
                                />
                        </FormControl>
                    </Grid>
            </Grid>
        );
    }

    const CreateCompanyName = () => {
        return (
            <Grid container spacing={3}>
                <Grid item xs={12} align='center'>
                    <FormControl className={classes.margin}>
                    <InputLabel htmlFor="input-with-icon-adornment">Company</InputLabel>
                    <Input
                    id="input-with-icon-adornment"
                    startAdornment={
                        <InputAdornment position="start">
                        <AccountBalanceIcon />
                        </InputAdornment>
                    }
                    placeholder="Enter company's name"
                    onChange={handleChange}
                    name='companyName'
                    />
                    {inCompanyName ? 
                            <FormHelperText id="component-helper-text">Duplicate Company</FormHelperText> : null
                    }
                    </FormControl>
                </Grid>
          </Grid>
        );
    }

    const creditCardInfo = () => {
        return (
            <Grid container spacing={2} alignItems='center'>
                <Grid item xs={6} align='center'>
                    <FormControl className={classes.margin}>
                            <InputLabel htmlFor="credit-card">credit card</InputLabel>
                                <Input
                                fullWidth={true}
                                id="input-credit-card"
                                startAdornment={
                                    <InputAdornment position="start">
                                    <CreditCardIcon />
                                    </InputAdornment>
                                }
                                placeholder="credit card"
                                name='creditCard'
                                onChange={handleChange}
                                />
                        </FormControl>
                </Grid>
                <Grid item xs={6} align='center'>
                        <FormControl className={classes.margin}>
                            <InputLabel htmlFor="credit-card">کد شبا</InputLabel>
                                <Input
                                fullWidth={true}
                                id="input-shaba-code"
                                startAdornment={
                                    <InputAdornment position="start">
                                    <CreditCardIcon />
                                    </InputAdornment>
                                }
                                placeholder="کد شبا"
                                name='shabaCode'
                                onChange={handleChange}
                                />
                        </FormControl>
                </Grid>
            </Grid>
        );
    }

    const showAlert = () => {
        if (res === true)
            return (
                    <Alert 
                                className={classes.alertStyle} 
                                severity='success' 
                                onClose={() => setRes(null)}>
                                    Account successfully Created
                    </Alert>
                            )
            
        else if (res == false)
            return (
                <Alert 
                    className={classes.alertStyle} 
                    severity='error' 
                    onClose={() => setRes(null)}> 
                    Issue in creating account
                </Alert>
                )

        else 
            return null
    }


    const confirmation = (props) => {
       
        const CreateMerchantModel = (props) => {
            const requestOptions = {
                method: "POST", 
                headers: {
                    "Content-Type": "application/json", 
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    name: info.companyName,
                    address: info.address,
                    first_name: info.firstName,
                    last_name: info.lastName,
                    phone: info.phone,
                    merchant_logo: null,
                    country: info.country,
                    province: info.province,
                    city: info.city, 
                    email: info.email,
                    is_merchant: true,
                    credit_card: info.creditCard, 
                    shaba_code: info.shabaCode
                })
            };
            fetch('/api/create-merchant', requestOptions)
            .then((response) => {
                if (response.ok) {
                    setRes(true);
                    return response.json();
                } else {
                    setRes(false);
                }
            })
            .then((data) => {
                setInfo({
                ...info,
                merchant_id: data.merchant_id
            });
            window.location.replace('/merchant/' + data.merchant_id)
            // props.history.push(`/merchant/${info.merchant_id}`)
            })
            
        }

        return (
            <Grid container spacing={1} alignItems='center'>
                <Grid item xs={12} aling='center'>
                    {showAlert()}
                </Grid>
                <Grid item xs={12} align='center'>
                    <Button color='secondary' variant='contained' onClick={CreateMerchantModel}>
                        Confirm my Info
                    </Button>
                </Grid>
            </Grid>
        );
    }


    const handleView = () => {
        if (props.part == 'company-name'){
            return CreateCompanyName();
        }
        else if (props.part == 'first-name')
            return CreateMainInfo();
        
        else if (props.part == 'location')
            return location();
        
        else if (props.part == 'logo')
        return logo();

        else if (props.part == 'credit')
            return creditCardInfo();
            
        else return confirmation();
    }


    return (
      handleView()
    );
}


const countries = [

    { code: 'IR', label: 'Iran, Islamic Republic of', phone: '98' },
    
    
  ];

const provinces = [
    
        {
            id: 4,
            title: "آذربايجان شرقي",
            slug: "East Azarbaijan",

        },
        {
            id: 5,
            title: "آذربايجان غربي",
            slug: "Western Azerbaijan",

        },
        {
            id: 25,
            title: "اردبيل",
            slug: "Ardabil"
},
{
    id: 11,
    title: "اصفهان",
    slug: "Esfahan",
},
{
    id: 31,
    title: "البرز",
    slug: "Alborz",
},
{
    id: 17,
    title: "ايلام",
    slug: "Ilam",
},
{
    id: 19,
    title: "بوشهر",
    slug: "Bushehr",
},
{
    id: 24,
    title: "تهران",
    slug: "Tehran",
},
{
    id: 30,
    title: "خراسان جنوبي",
    slug: "South Khorasan",
     
},
{
    id: 10,
    title: "خراسان رضوئ",
    slug: "Khorasan Razavi",
},
{
    id: 29,
    title: "خراسان شمالي",
    slug: "North Khorasan",
},
{
    id: 7,
    title: "خوزستان",
    slug: "Khuzestan"
},
{
    id: 20,
    title: "زنجان",
    slug: "Zanjan"
},
{
    id: 21,
    title: "سمنان",
    slug: "Semnan"
},
{
    id: 12,
    title: "سيستان وبلوچستان",
    slug: "Sistan and Baluchistan"
},
{
    id: 8,
    title: "فارس",
    slug: "Fars"
},
{
    id: 27,
    title: "قزوين",
    slug: "Qazvin"
},
{
    id: 26,
    title: "قم",
    slug: "Qom"
},
{
    id: 13,
    title: "كردستان",
    slug: "Kurdistan"
},
{
    id: 9,
    title: "كرمان",
    slug: "Kerman"
},
{
    id: 6,
    title: "کرمانشاه",
    slug: "Kermanshah"
},
{
    id: 18,
    title: "كهگيلويه وبويراحمد",
    slug: "Kohgiloyeh Boyerahmad"
},
{
    id: 28,
    title: "گلستان",
    slug: "Golestan"
},
{
    id: 2,
    title: "گيلان",
    slug: "Gilan"
    
},
{
    id: 16,
    title: "لرستان",
    slug: "Lorestan"

},
{
    id: 3,
    title: "مازندران",
    slug: "Mazandaran"
},
{
    id: 1,
    title: "مرکزی",
    slug: "Markazi"
},
{
    id: 23,
    title: "هرمزگان",
    slug: "Hormozgan"
},
{
    id: 14,
    title: "همدان",
    slug: "Hamedan"
},
{
    id: 15,
    title: "چهارمحال وبختياری",
    slug: "Chaharmahal and Bakhtiari "
},
{
    id: 22,
    title: "یزد",
    slug: "Yazd"
},

];