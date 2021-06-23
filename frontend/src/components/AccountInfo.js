import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import HomeIcon from '@material-ui/icons/Home';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import VisibilityIcon from '@material-ui/icons/Visibility';
import StorageIcon from '@material-ui/icons/Storage';


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
}));

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


export default function AccountInfo() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            Account Info
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <div className={classes.toolbar} />
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
        <Divider />
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Typography paragraph>
          
        </Typography>
        <Typography paragraph>
          
        </Typography>
      </main>
    </div>
  );
}

