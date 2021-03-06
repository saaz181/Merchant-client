import React, { useState } from 'react'
import { Button, Grid, Typography } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Header from './Header';
import StorageIcon from '@material-ui/icons/Storage';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import HomeIcon from '@material-ui/icons/Home';
import VisibilityIcon from '@material-ui/icons/Visibility';
import StarRatingComponent from 'react-star-rating-component';
import StarRateIcon from '@material-ui/icons/StarRate';
import { useDispatch, useSelector } from 'react-redux';
import { addToCartCount, addToCartItems } from '../actions';
import axios from 'axios';
import ProductCard from '../ProductDetailCard'

const useStyles = makeStyles((theme) => ({
    scroll: {
        overflowY: 'scroll',
        height: '100vh'
    },
    text: {
        marginLeft: theme.spacing(3),
        marginRight: theme.spacing(2),
    },
    picture: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        marginBottom: theme.spacing(3),
    },
    btn: {
        marginTop: theme.spacing(3),
        backgroundImage: 'linear-gradient(to right, rgba(255,0,0,0), rgba(255,0,0,1))'
    },
    img: {
        boxShadow: '1px 1px 1rem grey',
        borderRadius: '10px',
        maxWidth: '300px',
        maxHeight: '168px'
    }
    
  }));

const convert = (big_number) => {
    const values = {
        million: 1000000,
        billion: 1000000000
    }
    if (big_number / values.million >= 1) return (big_number / values.million).toString().substr(0, 5) + ' M';
    else if (big_number / values.billion >= 1) return (big_number / values.billion).toString().substr(0, 5) + ' B';
    else return big_number;
}


function productPage(props) {
    const classes = useStyles();
    const theme = useTheme();
    const { history } = props;
    const [stars, setStars] = useState(0);
    const { location } = props;
    const dispatch = useDispatch();
    const isAuthenticated = useSelector(state => state.isAuthenticated);

    const addToCart = (idx) => {
        axios.post('/api/create-cart', {
            product: idx,
            quantity: 1
        })
        .then(res => {
            if (res.status == 200){
                dispatch(addToCartCount(1));
                dispatch(addToCartItems(
                    [res.data]
                ));
            }
        })
        
    }

    const itemList = [
        {
            text: 'Home',
            icon: <HomeIcon />,
            onClick: () => window.location.replace('/')
        },
        {
            text: 'Purchased Product',
            icon: <ShoppingCartIcon />,
            onClick: () => history.push('/purchased-product')
        },
        {
            text: 'Views',
            icon: <VisibilityIcon />,
            onClick: () => history.push('/views'),
        },
        {
            text: 'Orders',
            icon: <StorageIcon />,
            onClick: () => history.push('/orders')
        },
        {
            text: 'active Product',
            icon: <AssignmentTurnedInIcon />,
            onClick: () => history.push('/active')
        },
        {
            text: 'Run out',
            icon: <HourglassEmptyIcon />,
            onClick: () => history.push('/run-out')
        },
        {
            text: 'Account Info',
            icon: <AccountCircleIcon />,
            onClick: () => history.push('/account-info')
        },
        
    ];


    return (
        <Grid container direction='column' className={classes.scroll}>
        <Grid item>
            <Grid item>
                <Header itemList={itemList} />
            </Grid>
            <Grid item container>
                <Grid item xs={12} sm={1} align='right' />
                <Grid item container xs={12} sm={10} spacing={1}>
                    
                    <Grid item xs={12} sm={12} align='center' className={classes.picture}>
                        <div> 
                            <img 
                                src={location.state.uploadedImage} 
                                alt={location.state.productName}
                                className={classes.img}
                                 />
                        </div>
                        <StarRatingComponent
                                name="Product Rating" 
                                starCount={5}
                                renderStarIcon={() => <StarRateIcon fontSize="large" />}
                                value={stars}
                                onStarClick={(nextValue, prevValue, name) => setStars(nextValue)}
                                editing={isAuthenticated}        
                                />
                    </Grid>

                    <Grid item xs={12} align='center' style={{marginBottom: theme.spacing(1)}}>
                            <ProductCard price={convert(location.state.price)}
                                         offPrice={convert(location.state.offPrice)}
                                         quantity={location.state.quantity}
                                         star={4}
                                         />                 
                    </Grid>

                    <Grid item xs={12} sm={12} md={12} align='left' className={classes.text}>
                        <Typography variant='h5' align='right'>
                            {location.state.productName}
                        </Typography>
                        <Typography variant='body1' compact="p" align='right'>
                            {location.state.description}
                        </Typography>
                            
                            <Button color='primary' 
                                    variant='contained' 
                                    className={classes.btn}
                                    onClick={() => addToCart(location.state.id)}
                                    >
                        Add to Cart
                            </Button>
                    </Grid>

                </Grid>
            </Grid>
            <Grid item xs={0} sm={1} aling='right'>
               
            </Grid>
        </Grid>
    </Grid>
    )
}


export default productPage;
