import React, {useState, useEffect} from 'react';
import { 
    BrowserRouter as Router, 
    Switch, 
    Route, 
    Link, 
    Redirect, 
} from "react-router-dom";

import { 
    Grid, 
    Button, 
    ButtonGroup, 
    Typography 
    } from "@material-ui/core";
import MerchantPage from './MerchantPage';
import HorizontalLabelPositionBelowStepper from './CreateMerchant';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import UserPage from './UserPage';
import { makeStyles } from '@material-ui/core/styles';
import MainMerchant from './MainMerchant';



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
    }

  }));


export default function Homepage (props) {

    const classes = useStyles();
    
    
    function renderMerchantPage() {
        return (
            <Grid container spacing={0} alignItems='center' className={classes.root} alignContent='stretch'>
                <Grid item xs={12} align='center'>
                    <AppBar position="absolute">
                        <Toolbar>
                        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            Music Communication
                        </Typography>
                        <Button color="inherit">Login</Button>
                        <Button color="inherit">Sign-up</Button>                
                        </Toolbar>
                    </AppBar>
                </Grid>

                <Grid item xs={12} align='center' spacing={0}>
                    <Typography variant='h4' compact='h4'> Music Communication </Typography>
                </Grid>
        
                <Grid item xs={12} align='center'>
                    <ButtonGroup disableElevation variant='contained' color='primary'>
                        <Button color='primary' to='/merchant' component={Link}>Merchant</Button>
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
            </Switch>
        </Router>        
    )
}




