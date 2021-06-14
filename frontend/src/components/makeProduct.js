import React, {Component, useState} from 'react';
import Button from '@material-ui/core/Button';
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
import StoreIcon from '@material-ui/icons/Store';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import DoneIcon from '@material-ui/icons/Done';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import ResponsiveDialog from './dialog';


const useStyles = makeStyles((theme) => ({
    root: {
      position:'relative',
      maxWidth: 400,
      // marginBottom: theme.spacing(2),
      marginRight: theme.spacing(1),
      marginLeft: theme.spacing(1),
      marginTop: theme.spacing(5),
    },
  
    media: {
      height: 140
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
      height: 'calc(100vh - 20px)',
      marginTop: -6,
      
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
        right: '0px',
        marginTop: theme.spacing(2)
    },
    shopCard2: {
        position: 'absolute',
        right: '0px',
        marginBottom: theme.spacing(3),
        marginRight: theme.spacing(1),

    },
    

    numberField: {
        position: 'absolute',
        right: '5rem',
        marginBottom: theme.spacing(1),
        maxWidth: 150,
        right: 18
    },
    priceField: {
        position: 'relative',
        maxWidth: 100,
        marginBottom: theme.spacing(1),
        
    },
    input: {
        display: 'none',
      },
    productName: {
        marginBottom: theme.spacing()
    }
      
  }));
  





export default function makeProduct (props) {
    const merchantId = props.match.params.merchantId;
    const {history} = props;
    const classes = useStyles();
    const theme = useTheme();
    
    const [logoPic, setLogoPic] = useState();
    const [type, setType] = useState({
        type: '',
        message: ''
    })
    const [open, setOpen] = React.useState(false);
    const [snack ,setSnack] = useState(false);
    const [LoadedImage, setLoadedImage] = useState('');
    const [state, setState] = useState({
        productName: '',
        price: '',
        offPrice: '',
        description: '',
        quantity: 0
    })

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
                text: 'Merchant Page',
                icon: <StoreIcon />,
                onClick: () => window.location.replace(`/merchant/${merchantId}`)
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

    const renderAlert = () => {
        function Alert(props) {
            return <MuiAlert elevation={6} variant="filled" {...props} />;
          }

          const handleClick = () => {
            setSnack(true);
          };
        
          const handleClose = (event, reason) => {
            if (reason === 'clickaway') {
              return;
            }
        
            setSnack(false);
          };
        
          return (
            <div className={classes.root}>
              <Snackbar open={snack} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={type.type}>
                  {type.message}
                </Alert>
              </Snackbar>
            </div>
          );
    }
    

    const CreateProduct = () => {
        const formData = new FormData();
        formData.append('product_name', state.productName);
        formData.append('product_description', state.description);
        formData.append('product_image', logoPic);
        formData.append('price', state.price);
        formData.append('quantity', state.quantity);
        formData.append('off', state.offPrice);
        
        
        axios.post('/api/create-product', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(response => {
            setLoadedImage('');
            setState({
                ...state,
                productName: '',
                description: '',
                price: '',
                quantity: 0,
                offPrice: ''
            })
            setType({
                type: 'success',
                message: 'Product SuccessFully Created'
            })
        })

        .catch(error => setType({
            type: 'error',
            message: 'Please Chack if You enter information correctely!'
        }))

        setSnack(true);

    }

    const renderProducts = () => {
        const handleFileChange = event => {
            const uploadedImage = event.target.files[0];
            console.log(uploadedImage);
            const objectUrl = URL.createObjectURL(uploadedImage);
            setLoadedImage(objectUrl);
            
            setLogoPic(event.target.files[0]);
         }


        return (
        <Card className={classes.root}>
        <CardActionArea>
            {LoadedImage === '' ? 
            <div>
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
                    Upload Product Picture
                    </Button>
                </label>
                </div>
                :
                <div className={classes.photo}>
                    <CardMedia
                    className={classes.media}
                    image={LoadedImage}
                    maxWidth='100'
                    />

                    <input
                    accept="image/*"
                    name='image'
                    className={classes.input}
                    id="contained-button-file"
                    type="file"
                    onChange={handleFileChange}

                />
                <label htmlFor="contained-button-file">
                    <Button 
                        variant="contained" 
                        color="primary" 
                        component="span" 
                        onChange={handleFileChange}
                        style={{marginTop: theme.spacing(1)}}
                        >
                    Change Photo
                    </Button>
                </label>
                </div>
        }
            
        </CardActionArea>
        <CardActions>
                <TextField
                        id="price"
                        label='price(تومان)'
                        type="number"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        
                        defaultValue={1}
                        size='small'
                        className={classes.numberField}
                        value={state.price}
                        onChange={(event) => setState({...state, price: event.target.value})}
                        />
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
                        defaultValue={0}
                        size='small'
                        className={classes.priceField}
                        value={state.quantity}
                        onChange={(event) => setState({...state, quantity: event.target.value})}
                        />
        </CardActions>
        </Card>
        );
    }

    const renderDetail = () => {
        return (
            <Card className={classes.root}>
            <CardContent>
                <Grid container spacing={1}>
                    <Grid item xs={12} align='center'>
                        <TextField
                            id="name"
                            label='Product Name'
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="outlined"
                            size='small'
                            className={classes.productName}
                            value={state.productName}
                            onChange={(event) => setState({...state, productName: event.target.value})}
                            />
                    </Grid>
                    <Grid item xs={12} align='center'>
                    <TextField
                            id="description"
                            label='description'
                            InputLabelProps={{
                                shrink: true,
                            }}
                            multiline
                            rows={3}
                            fullWidth
                            className={classes.productName}
                            value={state.description}
                            onChange={(event) => setState({...state, description: event.target.value})}
                            />
                    </Grid>
                    
                </Grid>
            </CardContent>
        <CardActions>
            <div className={classes.shopCard2}>
                        <Button size='small' style={{backgroundColor : '#7FFF00'}} onClick={() => CreateProduct()}>
                            <DoneIcon />
                        </Button>
                    </div>
                                    
        
        </CardActions>
        </Card>
        );
    }

    const renderOffInfo = () => {
        return (
                <Card className={classes.root}>
                <CardContent>
                    <Grid container spacing={1}>
                        <Grid item xs={12} align='center'>
                            <TextField
                                id="off"
                                label='off-price'
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant="outlined"
                                size='small'
                                className={classes.productName}
                                value={state.offPrice}
                                onChange={(event) => setState({...state, offPrice: event.target.value})}
                                />
                        </Grid>
                    </Grid>
                </CardContent>
            
            </Card>
            );
        
    }

    return (
        <Grid container spacing={1} className={classes.center} alignItems='center'>
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
                            {/* {state.name} */}
                        </Typography>
                        {/* <Button color="inherit">Login</Button> */}
                        
                        <Avatar />
                            <Typography variant='body2' color='default'>
                                    
                            </Typography>

                        </Toolbar>
                    </AppBar>
            </Grid>
            <Grid item xs={12} md={6} align='center'>
                {renderProducts()}
            </Grid>
            <Grid item xs={12} md={6} align='center'>
                {renderOffInfo()}
            </Grid>
            <Grid item xs={12} md={12} align='center'>
                {renderDetail()}
            </Grid>
            <div>
                {renderAlert()}
            </div>
            <Grid item xs={12} md={6} align='center' style={{marginBottom: '5em'}}>
                <Button 
                    color='secondary' 
                    variant='contained' 
                    size='small' 
                    onClick={() => history.push(`/merchant/${merchantId}`)}
                    >
                    Back
                </Button>
            </Grid>
        </Grid>
    );
}