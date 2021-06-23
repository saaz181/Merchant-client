import React, { useEffect, useState} from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { 
    Grid,
    TextField, 
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia
} from '@material-ui/core';
import axios from 'axios';
import VisibilityIcon from '@material-ui/icons/Visibility';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import StorageIcon from '@material-ui/icons/Storage';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import HomeIcon from '@material-ui/icons/Home';
import StoreIcon from '@material-ui/icons/Store';
import DoneIcon from '@material-ui/icons/Done';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Header from './Header';
import TreeItem from '@material-ui/lab/TreeItem';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';



const useStyles = makeStyles((theme) => ({
    root: {
      position:'relative',
      marginRight: theme.spacing(5),
      marginLeft: theme.spacing(5),
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
        flexGrow: 1,
        height: '100vh',
        overflowY: 'scroll'
      
    }, 
    card: {
        marginTop: '1.5rem'
    },
    cardButton:{
        position: 'relative',
        alignItems: 'center'
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
    },
    scroll: {
        overflowY: 'scroll',
        height: '100vh'
    }
      
}));
  

export default function makeProduct (props) {
    const merchantId = props.match.params.merchantId;
    const {history} = props;
    const {location} = props;
    const classes = useStyles();
    const theme = useTheme();
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
    
    const [logoPic, setLogoPic] = useState();
    const [type, setType] = useState({
        type: '',
        message: ''
    })

    const [snack ,setSnack] = useState(false);
    const [LoadedImage, setLoadedImage] = useState('');
    const [state, setState] = useState({
        productName: '',
        price: '',
        offPrice: '',
        description: '',
        quantity: 0,
        id: '',
    })
    const [category, setCategory] = useState({
        category: [],
        sub_category: [],
        sub_sub_category: [],
    });

    const editData = () => {
        const editedformData = new FormData();
        editedformData.append('product_name', state.productName);
        editedformData.append('product_description', state.description);
        editedformData.append('price', state.price);
        editedformData.append('quantity', state.quantity);
        
        // cause an error if picture or off price be empty
        if (logoPic) editedformData.append('product_image', logoPic);
        if (state.offPrice) editedformData.append('off', state.offPrice);

        axios.put('/api/create-product' + '?product_id=' + state.id, editedformData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(response => {
            setLogoPic('');
            setState({
                ...state,
                productName: '',
                description: '',
                price: '',
                quantity: 0,
                offPrice: ''
            });
            setType({
                type: 'success',
                message: 'Product SuccessFully Updated'
            })
        })

        .catch(error => {
            setType({
            type: 'error',
            message: 'Please Chack if You enter information correctely!'
        })
    }
        )

        setSnack(true);
    }

    useEffect(() => {
        const data = location.state;
        if (data) {
        setState({
            ...state,
            productName: data.productName,
            price: data.price,
            offPrice: data.offPrice,
            description: data.description,
            quantity: data.quantity,
            id: data.id
        });
        setLoadedImage(data.uploadedImage);  
        }
    }, [])    
    
    
    useEffect(() => {
        axios.get('/api/category')
        .then(response => setCategory({
            ...category,
            category: response.data
        }))
    }, [])


    const flatData = () => {
        let x = 0;
        if (category.category.length != 0) {
        return (
            <TreeView
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ChevronRightIcon />}
            >
            {category.category && category.category.map((item) => {
                const {id, title, description, sub_category} = item;
                return (
                    <TreeItem nodeId={x++} label={title}>
                        {sub_category && sub_category.map(item1 => {
                            const {id, title, description, sub_category} = item1;
                            return (
                                <TreeItem nodeId={id} label={title} >
                                    {sub_category && sub_category.map(item2 => {
                                        const {id, title, description} = item2;
                                        return (
                                            <TreeItem nodeId={id} label={title} />
                                        );
                                    })}
                                </TreeItem>
                            );
                        })}
                    </TreeItem>
                );
            })}
            
            </TreeView>
        );
    }
    
}


    const renderAlert = () => {
        function Alert(props) {
            return <MuiAlert elevation={6} variant="filled" {...props} />;
          }

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
        formData.append('price', state.price);
        formData.append('quantity', state.quantity);
        if (logoPic) formData.append('product_image', logoPic);
        if (state.offPrice) formData.append('off', state.offPrice);

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
            console.log(logoPic);
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
        <CardActions>
            <div className={classes.shopCard2}>
                        {state.id ? 
                                <Button 
                                size='small' 
                                style={{backgroundColor : '#7FFFD4'}} 
                                onClick={() => editData()}>
                                <DoneIcon />
                            </Button>
                            :
                            <Button 
                            size='small' 
                            style={{backgroundColor : '#7FFF00'}} 
                            onClick={() => CreateProduct()}>
                            <DoneIcon />
                        </Button>
                    }
                    </div>
        </CardActions>
        </Card>
        );
    }
    return (
        <Grid container direction='column' className={classes.scroll}>
        <Grid item>
            <Grid item>
                <Header companyName={location.state.name}
                        itemList={itemList}
                        picture={location.state.logo}
                        />
            </Grid>
            <Grid item container>
                <Grid item xs={12} sm={4}>
                    {renderProducts()}
                </Grid>
                <Grid item xs={12} sm={4}>
                    {renderDetail()}
                    <Button 
                    color='secondary' 
                    variant='contained' 
                    size='small' 
                    onClick={() => history.push(`/merchant/${merchantId}`)}
                    style={{marginLeft: theme.spacing(2), marginTop: theme.spacing(2)}}
                    >
                    Back
                </Button>
                </Grid>
                <Grid item xs={12} sm={4}>
                    {flatData()}
                </Grid>
            </Grid>
            {renderAlert()}
            <Grid item xs={0} sm={2} />
        </Grid>
    </Grid>
    );
}