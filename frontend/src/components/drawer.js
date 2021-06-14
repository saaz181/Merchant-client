import React, {Component, useState} from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Divider, Grid } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import VisibilityIcon from '@material-ui/icons/Visibility';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Avatar from '@material-ui/core/Avatar';
import { 
    Drawer as MUIDrawer, 
    List,
    ListItem, 
    ListItemIcon, 
    ListItemText,
    
} from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import StorageIcon from '@material-ui/icons/Storage';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import HomeIcon from '@material-ui/icons/Home';


const useStyles = makeStyles((theme) => ({
    root: {
      position:'relative',
      maxWidth: 400,
      // marginBottom: theme.spacing(2),
      marginRight: theme.spacing(1),
      marginLeft: theme.spacing(1),
      marginTop: theme.spacing(1),
    },
  
    media: {
      height: 140,
    },
    menuButton: {
      marginRight: theme.spacing(1),
    },
  
    title: {
      flexGrow: 1,
    },
    center: {
      position: 'absolute',
      top: '-15rem',
      overflowY: 'scroll',
      height: 'calc(100vh - 50px)',
      marginTop: -6,
      marginBottom: 0
      
    }, 
    card: {
        marginTop: '1.5rem'
    },
    cardButton:{
        position: 'relative',
        alignItems: 'center'
    },
    drawer: {
        width: '140px',
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: 'flex-end',
    },
    shopCard: {
        position: 'absolute',
        right: '0px'
    },
    numberField: {
        position: 'absolute',
        right: '5rem',
        marginBottom: theme.spacing(2)
    }
    
  }));
  





export default function makeProduct (props) {
    const {history} = props;
    const classes = useStyles();
    const theme = useTheme();

    const [open, setOpen] = React.useState(false);
    const handleDrawerClose = () => {
        setOpen(false);
    }
    const renderDrawer = () => {
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

    return (
        <Grid container spacing={2} className={classes.center} alignItems='center'>
                            {renderDrawer()}
            <Grid item xs={12} align='center' style={{marginBottom: 32}}>
            <AppBar position="absolute">
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
                        <Typography variant="h6" className={classes.title}>
                            {/* {state.name} */}
                        </Typography>
                        {/* <Button color="inherit">Login</Button> */}
                        
                        <Avatar />
                            <Typography variant='body2' color='default'>
                                    
                            </Typography>

                        </Toolbar>
                    </AppBar>
            </Grid>
        </Grid>
    );
}