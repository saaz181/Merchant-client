import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import {
    AppBar, 
    Toolbar,
    Drawer,
    CssBaseline,
    List,
    Typography,
    Divider,
    IconButton,
    ListItem,
    ListItemIcon,
    ListItemText,
    Avatar,
    Fab,
    Button,
} 
from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { Link } from 'react-router-dom';
import CustomizedBadges from './shopBadge';
import {useSelector} from 'react-redux';
import StoreIcon from '@material-ui/icons/Store';


const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

export default function Header(props) {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const {companyName, itemList, picture, merchantId, auth, logout}  = props;
    const isAuthenticated = useSelector(state => state.isAuthenticated);
    const merchantIdx = useSelector(state => state.merchantId);

    const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap style={{flex: 1}}>
            {companyName}
          </Typography>
            {merchantId ? 
            <Link to={{
                pathname: `/make-product/${merchantId}`,
                state: { 
                    name: companyName,
                    logo: picture
                }
            }}>
                <Fab color="secondary" aria-label="add">
                    
                    <AddIcon />
                </Fab>
            </Link>
            :
            <div>
              {isAuthenticated ?
               <div>
               {window.location.pathname != '/cart' ?
                 <span>
                    <IconButton>
                        <Link to={{pathname: '/cart'}} >
                          <CustomizedBadges />
                        </Link>    
                    </IconButton>
                    {merchantIdx ? 
                            <Link to={{pathname: `/merchant/${merchantIdx}`}}>
                                    <IconButton style={{color: 'white'}}>
                                        <StoreIcon />
                                    </IconButton>
                            </Link>
                            :
                            <Link to={{pathname: `/merchant`}}
                                style={{textDecoration : 'none', color: 'inherit'}}>
                                    Create Merchant 
                            </Link>

                    }
                  </span>
                 :
                 
                 <Link to={{pathname: '/order'}}>
                   <Button size='small' variant='contained' color='secondary'>
                       Buy
                   </Button>
                 </Link>
             }
             </div>
             :
             <div>
                <Button size='small' variant='contained' color='primary' onClick={() => auth()}>
                    sign up
                </Button>
                <Button size='small' variant='contained' color='secondary' onClick={() => auth()}>
                      Login
                </Button>
           </div> 
            }
              
          </div>
            
            }
        </Toolbar>
      </AppBar>
      
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
            <Avatar src={picture} style={{marginRight: theme.spacing(4)}} />
          <IconButton onClick={handleDrawerClose} >
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

      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
      </main>
    </div>
  );
}
