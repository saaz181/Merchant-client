import React, {useEffect, useState} from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { 
    BrowserRouter as Router, 
    Switch, 
    Route,
    Link
} from "react-router-dom";
import { Grid, Button } from "@material-ui/core";
import HorizontalLabelPositionBelowStepper from './CreateMerchant';
import VisibilityIcon from '@material-ui/icons/Visibility';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import StorageIcon from '@material-ui/icons/Storage';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import StoreIcon from '@material-ui/icons/Store';
import axios from 'axios';
import makeProduct from './makeProduct';
import AccountInfo from './AccountInfo';
import RecipeReviewCard from './new';
import Header from './Header';
import UserPage from './UserPage';
import MainMerchant from './MainMerchant';
import productPage from './productPage';
import Content from './content';
import Cart from './Cart';
import CustomizedSnackbars from './snackBar';
import {useDispatch, useSelector} from 'react-redux';
import { addToCartCount, addToCartItems, authenticate, setMerchantId } from '../actions';
import Orders from './Orders';
import errorPage from './404Page';
import Checkout from './checkout/index';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';


const useStyles = makeStyles((theme) => ({
    scroll: {
        overflowY: 'scroll',
        height: '100vh'
    }
      

  }));

export default function Homepage (props) {
    const classes = useStyles();
    const theme = useTheme();
    const {history} = props;
    const dispatch = useDispatch();

    const [authenticated, setAuthenticated] = useState(false);
    const [state, setState] = useState({
        name: '',
        picture: '',
        merchant_id: '',
    });
    const [createMerchant, setCreateMerchant] = useState(true);
    const [allProduct, setAllProduct] = useState([]);
    const isAuthenticated = useSelector(state => state.isAuthenticated)

    useEffect(() => {
        axios.get('/api/user-has-merchant')
        .then(response => {
                setState({
                ...state,
                merchant_id: response.data.merchant_id
            })
            dispatch(setMerchantId(response.data.merchant_id));
            if (!response.data.merchant_id) {
                setMerchantCreation(true)
                setCreateMerchant(false);
            };
        });
    }, [state.merchant_id])

    const itemList = [
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
                onClick: () => window.location.replace('/active-product')
            },
            {
                text: 'Run out',
                icon: <HourglassEmptyIcon />,
                onClick: () => history.push('/run-out')
            },
            {
                text: 'Account Info',
                icon: <AccountCircleIcon />,
                onClick: () => window.location.replace('/account-info')
            },
            {
                text: 'Log-out',
                icon: <ExitToAppIcon />,
                onClick: () => {if (authenticated) {logOut(); window.location.reload()}}
            }
            
        ];
        
    
    const authentication = () => {
        fetch('/api/google-get-auth-url')
        .then((response) => response.json())
        .then((data) => {
            window.location.replace(data.url);
        })
    }

    const logOut = () => {
        axios.post('/api/google-log-out');
        
        setAuthenticated(false);
        dispatch(authenticate(false));
        
    }

    
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
            } else {
                console.log(res);
            }
        })
        
    }

    useEffect(() => {
        fetch('/api/is-user-authenticated')
        .then(response => response.json())
        .then((data) => {
            setAuthenticated(data.status);
            dispatch(authenticate(data.status));
        })

    }, [authenticated])


    useEffect(() => {
        axios.get('/api/google-info')
        .then(response => {
            if (authenticated) {
                const info = response.data;
                setState({
                    ...state,
                    name: info.name,
                    picture: info.picture
                })
            }
        })
        
    }, [authenticated])

    useEffect(() => {
        axios.get('/api/product')
        .then(response => setAllProduct(response.data))
    }, [])

    
    useEffect(() => {
        axios.post('/api/create-user')
    } ,[])


    useEffect(() => {
        axios.get('/api/create-cart')
        .then(res => {
              dispatch(addToCartCount(res.data.length));
              dispatch(addToCartItems(res.data));
        })
    }, [])

    const renderMerchantPage = () => {
        return(
            <Grid container direction='column' className={classes.scroll}>
        <Grid item>
            <Grid item>
                <Header companyName={state.name} itemList={itemList} picture={state.picture} auth={authentication} />
            </Grid>
            <Grid item container>
                <Grid item xs={12} sm={1} >
                {createMerchant ? 
                        null
                        :
                    <Button color='primary' to='/merchant' component={Link} disabled={!authenticated}>Merchant</Button>
                }
                </Grid>
                <Grid item xs={12} sm={10} >
                    <Content 
                            product={allProduct}
                            isMerchant={false}
                            cart={addToCart}
                            />
                </Grid>
            </Grid>
            <Grid item xs={12} sm={1}>
                <CustomizedSnackbars message="Added to cart" type="success" />  
            </Grid>
        </Grid>
    </Grid>
        );
    }
        
    return (
        <Router>
            <Switch>
                <Route exact path='/' render={() => renderMerchantPage()} />
                <Route exact path='/merchant' component={HorizontalLabelPositionBelowStepper} />
                <Route exact path='/user' component={UserPage} />
                <Route path='/merchant/:merchantId' render={(props) => {
                    return <MainMerchant {...props} />
                }} component={MainMerchant} />
                <Route path='/make-product/:merchantId' render={(props) => {
                    return <makeProduct {...props} />
                }} component={makeProduct} />
                <Route path='/product/:id/:slug' component={productPage} />
                <Route path='/account-info' component={AccountInfo} />
                <Route path='/active-product' component={RecipeReviewCard} />
                <Route path='/error' component={errorPage} />
                <Route exact path='/cart' render={(props) => <Cart header={<Header companyName={state.name} itemList={itemList} picture={state.picture} />} {...props} />} />
                <Route exact path='/order' component={Orders} />
                <Route exact path='/checkout' component={Checkout} />
            </Switch>
        </Router>
    );
}