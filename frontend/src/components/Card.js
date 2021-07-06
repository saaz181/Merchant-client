import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { 
    Card, 
    CardActions, 
    CardContent, 
    CardHeader,  
    Typography, 
    Avatar,
    IconButton,
    CardMedia,
    Menu,
    MenuItem,
    BottomNavigation,
    BottomNavigationAction,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,

} from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import EditIcon from '@material-ui/icons/Edit';
import {Link} from 'react-router-dom';
import axios from 'axios';
import StoreIcon from '@material-ui/icons/Store';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import snackBar from './snackBar';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, openSnack } from '../actions';


const useStyles = makeStyles((theme) => ({ 
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
    avatar: {
        backgroundColor: red[500],
    },
    media: {
        height: 0,
        paddingTop: '56.25%',
        objectFit: 'cover',
    },
    navigation: {
        position: 'absolute',
        marginLeft: 20
        
    },
    card: {
        minWidth: 227, 
        marginRight: theme.spacing(1), 
        marginLeft: theme.spacing(1),
        
    }
}));

const convert = (big_number) => {
    const values = {
        million: 1000000,
        billion: 1000000000
    }
    if (big_number / values.million >= 1) return (big_number / values.million).toString().substr(0, 4) + ' M';
    else if (big_number / values.billion >= 1) return (big_number / values.billion).toString().substr(0, 4) + ' B';
    else return big_number;
}

const ITEM_HEIGHT = 48;

const CustomCard = (props) => {
    const classes = useStyles();
    const theme = useTheme();
    const dispatch = useDispatch();
    const isAuthenticated = useSelector(state => state.isAuthenticated);    
    const {
        avatarSrc, 
        product_name, 
        price, 
        product_description, 
        product_image, 
        id, 
        merchantId, 
        off, 
        quantity, 
        isMerchant,
        slug,
        merchant_logo,
        cart
    } = props;
     

    const [dialog, setDialog] = React.useState(false);
    

    const setPicture = () => {
        if (avatarSrc) return avatarSrc;
        return merchant_logo;
    }

    const handleClickOpen = () => {
        setDialog(true);
      };
    
    const handleClickClose = () => {
        setDialog(false);
      };
    
    const handleClickCloseOk = () => {
        setDialog(false);
        axios.delete(`/api/create-product?product_id=${id}`)
        window.location.reload();
    };

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const renderSnackBar = () => {
        dispatch(openSnack());
        }

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        
            <Card className={classes.card}>
                <CardHeader
                avatar={

                <Avatar aria-label="recipe" className={classes.avatar} src={setPicture()}>
                    {product_name.substr(0, 1).toUpperCase()}
                </Avatar>
                }
                action={
                    <div>
                <IconButton 
                    aria-label="more"
                    aria-controls="long-menu"
                    aria-haspopup="true"
                    onClick={handleClick}
                    >
                    <MoreVertIcon />
                </IconButton>
                    <Menu
                    id="long-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={open}
                    onClose={handleClose}
                    PaperProps={{
                    style: {
                        maxHeight: ITEM_HEIGHT * 4.5,
                        width: '20ch',
                        },
                    }}
                    >
                   
                    
                    {isMerchant ?
                    <div>
                        <Link to={{
                            pathname: `/make-product/${merchantId}`,
                            state: { 
                                id: id,
                                productName: product_name,
                                price: price,
                                offPrice: off,
                                description: product_description,
                                quantity: quantity,
                                uploadedImage: product_image
                            }
                        }}>
                    <MenuItem ><EditIcon color='primary' /> Edit</MenuItem>
                </Link>
                <MenuItem onClick={handleClickOpen}>
                        <DeleteOutlineIcon color='secondary' /> delete
                    </MenuItem>
                <Dialog
                        open={dialog}
                        onClose={handleClickClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                        >
                        <DialogTitle id="alert-dialog-title">{'Delete Product'}</DialogTitle>
                        <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Are you sure to delete this Product?
                        </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                        <Button onClick={handleClickClose} color="primary">
                            No
                        </Button>
                        <Button onClick={handleClickCloseOk} color="primary" autoFocus>
                            Yes
                        </Button>
                        </DialogActions>
                    </Dialog>
                    </div>
                    :
                    <MenuItem>
                        <StoreIcon color='primary' /> Add to cart
                    </MenuItem>
                }
                </Menu>
            </div>
                }
                title={product_name}
                subheader={ off ? 
                    <span>
                    price:  <del>{convert(price)}</del>  {convert(off)}
                    </span>
                    :
                    <span>         
                        price: {convert(price)}
                    </span>
                }
            />
            <Link to={{
            pathname: `/product/${id}/${slug}`,
            state: { 
                                id: id,
                                productName: product_name,
                                price: price,
                                offPrice: off,
                                description: product_description,
                                quantity: quantity,
                                uploadedImage: product_image,
                                
                            }
             }} >
                <CardMedia
                className={classes.media}
                image={product_image}
                title={product_name}
        />
        </Link>
        <CardContent>
            <Typography variant="body2" component="p">
            {product_description.length > 31 ? product_description.substr(0, 30) + '...' : product_description}
            <br />
            </Typography>
        </CardContent>
        <CardActions>
        <BottomNavigation
        showLabels
        style={{flex: 1}}
                >
                    <BottomNavigationAction label="views" icon={0} />
                    <BottomNavigationAction label="quantity" icon={quantity} />
                    <BottomNavigationAction onClick={() => {
                        if (isAuthenticated){
                            cart(id);
                            renderSnackBar();
                        }
                        }} label='add to cart' icon={<ShoppingCartIcon />} />
                    </BottomNavigation>
        </CardActions>
        </Card>
    );
}

export default CustomCard;