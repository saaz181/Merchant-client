import React, {useDebugValue, useEffect, useState} from 'react';
import { 
    BrowserRouter as Router, 
    Switch, 
    Route, 
    Link,
    Redirect
} from "react-router-dom";

import { 
    Grid, 
    Button, 
    ButtonGroup, 
    Typography 
    } from "@material-ui/core";
import MerchantPage from './MerchantPage';
import MainMerchant from './MainMerchant';
import HorizontalLabelPositionBelowStepper from './CreateMerchant';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import UserPage from './UserPage';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import VisibilityIcon from '@material-ui/icons/Visibility';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { 
    Drawer as MUIDrawer, 
    List,
    ListItem, 
    ListItemIcon, 
    ListItemText
} from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import StorageIcon from '@material-ui/icons/Storage';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import {  Divider } from '@material-ui/core';
import axios from 'axios';
import Avatar from '@material-ui/core/Avatar';
import StoreIcon from '@material-ui/icons/Store';
import makeProduct from './makeProduct';
import ScrollableTabsButtonPrevent from './dialog';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      height: "80vh",
      overflow: 'auto'
    },

    menuButton: {
      marginRight: theme.spacing(2),
    },

    title: {
      flexGrow: 1,
      right: 20,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
      },
    navbar: {
        overflow: 'hidden',    
    }
      

  }));


export default function Homepage (props) {
    const classes = useStyles();
    const theme = useTheme();

    const [open, setOpen] = useState(false);
    const [authenticated, setAuthenticated] = useState(false);
    const [state, setState] = useState({
        name: '',
        picture: '',
        merchant_id: '',
    });

    const handleDrawerClose = () => {
        setOpen(false);
    }
    const checkForMerchant = () => {
        if (authenticated && state.merchant_id){
            return () => window.location.replace(`merchant/${state.merchant_id}`);
        }
        return null;
    }

    const renderDrawer = () => {
        const itemList = [
            {
                text: 'Merchant Page',
                icon: <StoreIcon />,
                onClick: checkForMerchant()
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
        <MUIDrawer 
            variant='temporary' 
            open={open} 
            onBackdropClick={handleDrawerClose}
            onEscapeKeyDown={handleDrawerClose}
            className={classes.drawer}
            >
        <div className={classes.drawerHeader}>
        <IconButton onClick={handleDrawerClose}>
                {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
          </div>
                <Divider />
            <List>
                {itemList.map((item, index) => {
                const { text, icon, onClick } = item;
                return (
                <ListItem button key={text} onClick={onClick}>
                    {icon && <ListItemIcon>{icon}</ListItemIcon>}
                <ListItemText primary={text} />
                </ListItem>
                );
            })}
            </List>
        </MUIDrawer>
        );
    }

    const authentication = () => {
        fetch('/api/google-get-auth-url')
        .then((response) => response.json())
        .then((data) => {
            window.location.replace(data.url);
        })
    }

    const logOut = () => {
        axios.post('/api/google-log-out')
        .then(response => setAuthenticated(false))
    }

    useEffect(() => {
        axios.get('/api/user-has-merchant')
        .then(response => {
                setState({
                ...state,
                merchant_id: response.data.merchant_id
            })
        });
    }, [state.merchant_id])

    useEffect(() => {
        fetch('/api/is-user-authenticated')
        .then(response => response.json())
        .then((data) => setAuthenticated(data.status))
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

    
    

    function renderMerchantPage() {
        return (
            <Grid container spacing={0} alignItems='center' className={classes.root} alignContent='stretch'>
                 {renderDrawer()}
                <Grid item xs={12} align='center' className={classes.navbar} >                    
                    <AppBar position="absolute" >
                        <Toolbar>
                        <IconButton
                             edge="start" 
                             className={classes.menuButton} 
                             color="inherit" 
                             aria-label="menu"
                             onClick={() => setOpen(true)}
                             >
                            <MenuIcon />
                        </IconButton>
                        
                        {!authenticated ? <div>
                            <Button color="inherit" onClick={() => authentication()}>Login</Button>
                            <Button color="inherit" onClick={() => authentication()}>Sign-up</Button>
                        </div>
                        :
                        <div>
                            <Button color="inherit" onClick={() => logOut()}>logout</Button>
                            <Button color="inherit">{state.name}
                            <Avatar alt={state.name} src={state.picture} style={
                                {
                                    marginLeft: 10
                                }
                            } />
                            </Button>
                        </div>
                    }
                                        
                        </Toolbar>
                    </AppBar>
                </Grid>

                <Grid item xs={12} align='center' spacing={0}>
                    <Typography variant='h4' compact='h4'> Music Communication </Typography>
                </Grid>
        
                <Grid item xs={12} align='center'>
                    <ButtonGroup disableElevation variant='contained' color='primary'>
                        <Button color='primary' to='/merchant' component={Link} disabled={!authenticated}>Merchant</Button>
                        <Button color='secondary' to='/user' component={Link}>Customer</Button>
                    </ButtonGroup>
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
            </Switch>
        </Router>        
    )
}




