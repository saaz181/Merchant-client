import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import {useSelector, useDispatch} from 'react-redux';
import { close } from '../actions';


function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function CustomizedSnackbars(props) {

  const open = useSelector(state => state.open)
  const dispatch = useDispatch();
  const {message, type} = props;
  const classes = useStyles();
  let horizontal = 'left';
  let vertical = 'bottom';
  return (
    <div className={classes.root}>
      <Snackbar open={open}
                autoHideDuration={3000}
                onClose={() => dispatch(close())}
                anchorOrigin={{vertical, horizontal}}
                key={vertical + horizontal}
                >
        <Alert onClose={() => dispatch(close())} severity={type}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}
