import React, {Component, useState, useEffect} from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { CssBaseline, Divider, Grid } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import VisibilityIcon from '@material-ui/icons/Visibility';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import Avatar from '@material-ui/core/Avatar';
import { 
    Drawer as MUIDrawer, 
    List,
    ListItem, 
    ListItemIcon, 
    ListItemText
} from '@material-ui/core';
import axios from 'axios';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import StorageIcon from '@material-ui/icons/Storage';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const useStyles = makeStyles((theme) => ({
  root: {
    position:'relative',
    maxWidth: 300,
    // marginBottom: theme.spacing(2),
    marginLeft: theme.spacing(1),
    marginTop: theme.spacing(2),
    marginRight: theme.spacing(1),
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
    height: 'calc(100vh - 50px)'

  }, 
  card: {
      marginTop: 50
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
  

}));

const numbers = [1,2,3,4];


export default function MainMerchant (props) {
    const classes = useStyles();
    const theme = useTheme();
    const {history} = props;

    const merchatId = props.match.params.merchantId;
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
        product: ''
    })
    
    useEffect(() => {
            axios.get('/api/get-merchant-info' + '?id=' + merchatId)
            .then(response => {
                // setState({
                //     product: response.data.product, 
                //     name: response.data.name, 
                //     isMerchant: response.data.is_merchant,
                //     merchantLogo: response.data.merchant_logo,
                //     firstName: response.data.first_name,
                // })
                return response.data();
            }).catch(error => console.log(error));
            // axios.Cancel();
    })


    const renderProducts = () => {
        
        return (
        <Card className={classes.root}>
        <CardActionArea>
            <CardMedia
            className={classes.media}
            image="/static/images/cards/index.jpg"
            title="Contemplative Reptile"
            maxWidth='100'
            />
            <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
                Lizard
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
                tuhterueriugjregjihi
                dasdasda 
            </Typography>
            </CardContent>
        </CardActionArea>
        <CardActions>
            
                <VisibilityIcon /> 
                    <Typography variant='body2' color='default'>
                        23
                    </Typography>
                <ShoppingCartIcon />
                    <Typography variant='body2' color='default'>
                        12
                    </Typography>
                <Button size='small' spacing={2}>
                    <AddShoppingCartIcon />
                </Button>
        </CardActions>
        </Card>
        );
    }
    const [open, setOpen] = React.useState(false);
    const handleDrawerClose = () => {
        setOpen(false);
    }
    const renderDrawer = () => {
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
            <Grid item xs={12} align='center'>
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
                            {state.name}
                        </Typography>
                        {/* <Button color="inherit">Login</Button> */}
                        <Button color="inherit"> <AddShoppingCartIcon /> Add Product </Button>
                        <Avatar alt={state.firstName} src={state.merchantLogo} />
                            <Typography variant='body2' color='default'>
                                    
                            </Typography>

                        </Toolbar>
                    </AppBar>
            </Grid>  
            {numbers.map((number) => (
                <Grid item xs={12} md={4} align='center' className={classes.card}>
                {renderProducts()}
            </Grid>
            ))}
           
        </Grid>
      );
}