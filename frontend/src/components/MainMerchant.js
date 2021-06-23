import React, {useState, useEffect} from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import axios from 'axios';
import Header from './Header';
import Content from './content';
import StorageIcon from '@material-ui/icons/Storage';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import HomeIcon from '@material-ui/icons/Home';
import VisibilityIcon from '@material-ui/icons/Visibility';


const useStyles = makeStyles((theme) => ({
    scroll: {
        overflowY: 'scroll',
        height: '100vh'
    }
  
}));


export default function MainMerchant (props) {
    const classes = useStyles();
    const theme = useTheme();
    const {history} = props;

    const itemList = [
        {
            text: 'Home',
            icon: <HomeIcon />,
            onClick: () => history.push('/')
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

    const merchatId = props.match.params.merchantId;
    const [counter, setCounter] = useState(0);
    const [state, setState] = useState({
        name: '',
        firstName: '', 
        lastName: '',
        phone: '',
        merchantLogo: '',
        country: '',
        province: '',
        city: '',
        email: '',
        isMerchant: '',
        created_at: '',
        creditCard: '',
        shabaCode: '', 
        product: []
    })
    
    
    useEffect(() => {
            axios.get('/api/get-merchant-info' + '?id=' + merchatId)
            .then(response => {
                setState({
                    product: response.data.product,
                    name: response.data.name, 
                    isMerchant: response.data.is_merchant,
                    merchantLogo: response.data.merchant_logo,
                    firstName: response.data.first_name,
                })
            }).catch(error => console.log(error));
    }, [counter])

      
    return (
        <Grid container direction='column' className={classes.scroll}>
        <Grid item>
            <Grid item>
                <Header companyName={state.name}
                        itemList={itemList}
                        picture={state.merchantLogo}
                        merchantId={merchatId}
                        />
            </Grid>
            <Grid item container>
                <Grid item xs={12} sm={2} />
                <Grid item xs={12} sm={8} >
                    <Content 
                        product={state.product}
                        logo={state.merchantLogo}
                        isMerchant={state.isMerchant}
                        merchantId={merchatId}
                        />
                </Grid>
            </Grid>

            <Grid item xs={0} sm={2} />
        </Grid>
    </Grid>
       
      );
}