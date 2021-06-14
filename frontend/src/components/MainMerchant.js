import React, {useState, useEffect} from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Divider, Grid } from '@material-ui/core';
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
    ListItemText,
    TextField
} from '@material-ui/core';
import axios from 'axios';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import StorageIcon from '@material-ui/icons/Storage';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import HomeIcon from '@material-ui/icons/Home';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import AlertDialog from './dialog'

const useStyles = makeStyles((theme) => ({
  root: {
    position:'relative',
    maxWidth: 400,
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(1),
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(1),
    boxShadow: '0px 0px 20px #A9A9A9',
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
//   center: {
//     position: 'absolute',
//     top: '-15rem',
//     overflowY: 'scroll',
//     height: 'calc(100vh - 4.5rem)',
//     marginTop: -6,
//     marginBottom: 0,
//     paddingTop: 0,
//     flexGrow: 1
//   },
  
  center: {
    flexGrow: 1,
    height: "100vh",
    overflowY: 'scroll',
  },

  card: {
    marginTop: theme.spacing(1),
    // paddingTop: '50px'
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
      marginBottom: theme.spacing(2),
      maxWidth: 61
  },
  delete: {
      position: 'absolute',
      color: 'red',
      backgroundColor: '#FAEBD7'
  },
  navbar: {
    overflow: 'hidden',   
    marginBottom: theme.spacing(4),

}
  
  
}));


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
        product: []
    })
    const [counter, setCounter] = useState(0);
    
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

    const deleteProduct = (id) => {
        axios.delete(`/api/create-product?product_id=${id}`)
        .then(response => setCounter(counter + 1))
    }

    const [dialog, setDialog] = useState({
        open: false,
        ok: null,
        id: ''
    });

    const returnDialog = () => {
        const handleCloseCancel = () => {
            setDialog({
                ...dialog,
                open: false,
                ok: false
            });

        }

        const handleCloseOk = () => {
            setDialog({
                ...dialog,
                open: false,
                ok: true
            });
        }

        if (dialog.ok) {
            deleteProduct(dialog.id);
            setDialog({
                ...dialog,
                ok: null,
                id: ''
            })
        }


        return (
        <AlertDialog 
            open={dialog.open} 
            handleCloseOk={handleCloseOk} 
            handleCloseCancel={handleCloseCancel}
            title='Delete Product' 
            content='Are you sure to delete product?'
             />
        );
    }
    
    
    const renderProducts = (product_name, product_description, price, quantity, image, id) => {
        if (product_description.length > 44) {
            product_description = product_description.substr(0, 44) + ' ...'
        }
        let limit = 2000000;
        if (price > limit) console.log(price.length);

        return (
        <Card className={classes.root}>
        <CardActionArea>
            <CardMedia
                className={classes.media}
                image={image}
                title="Contemplative Reptile"
                maxWidth='100'
                >
                <div className={classes.delete} onClick={() => {
                    setDialog({...dialog, open: true, id: id});
                    }}>
                    <DeleteOutlineIcon />
                </div>
                </CardMedia>
            <CardContent>
                <Grid container spacing={1}>
                    <Grid item xs={12} align='center'>
                        <Typography variant='h6' compact='h6'> {product_name}</Typography>
                    </Grid>
                    <Grid item xs={12} align='center'>
                        <Typography variant='p'> {product_description} </Typography>
                    </Grid>
                    <Grid item xs={6} >
                        <Typography variant='subtitle1' >Price: {price.toString()}</Typography>
                    </Grid>
                </Grid>
            </CardContent>
        </CardActionArea>
        <CardActions>
                <VisibilityIcon /> 
                    <Typography variant='body2' color='default'>
                        0
                    </Typography>
                <ShoppingCartIcon />
                    <Typography variant='body2' color='default'>
                        0
                    </Typography>
                    <TextField
                        id="quantity"
                        label='quantity'
                        type="number"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        InputProps={{
                            inputProps: { 
                                max: 1000, min: 0
                            }
                        }}
                        value={quantity}
                        defaultValue={quantity}
                        size='small'
                        className={classes.numberField}
                        />
                    <div className={classes.shopCard}>
                <Button size='small'>
                    <AddShoppingCartIcon />
                </Button>
                </div>
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

    const returnProductPage = () => {
        return window.location.replace(`/make-product/${merchatId}`);
    }
    
    return (
        
        <Grid container spacing={2} className={classes.center} alignItems='flex-start' >
                            {renderDrawer()}
            <Grid item xs={12} align='center' className={classes.navbar}>
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
                        <Button color="inherit" onClick={() => returnProductPage()} >
                             <AddShoppingCartIcon />
                            Add Product
                            </Button>
                        <Avatar alt={state.firstName} src={state.merchantLogo} />
                            <Typography variant='body2' color='default'>
                                    
                            </Typography>

                        </Toolbar>
                    </AppBar>
            </Grid>
            {state.product && state.product.map((product) => (
                <Grid item xs={12} md={4} lg={4} align='center' className={classes.card}>
                {renderProducts(product.product_name, product.product_description, product.price, product.quantity, product.product_image, product.id)}
            </Grid>
            ))}
            {returnDialog()}
        </Grid>
      );
}