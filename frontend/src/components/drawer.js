import React, {useState, useEffect} from 'react';
import { 
    Drawer as MUIDrawer, 
    List,
    ListItem, 
    ListItemIcon, 
    ListItemText
} from '@material-ui/core';
import StorageIcon from '@material-ui/icons/Storage';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { Divider } from '@material-ui/core';
import VisibilityIcon from '@material-ui/icons/Visibility';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import StorageIcon from '@material-ui/icons/Storage';
import { makeStyles, useTheme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
      },
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
      },
}))

export default function renderDrawer (props) {
    const {history} = props;
    const theme = useTheme();

    const [open, setOpen] = useState(false);
        const handleDrawerClose = () => {
            setOpen(false);
        }
    
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
            <div>
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
        </div>
        
        );
    
}