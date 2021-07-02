import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { useSelector, useDispatch } from 'react-redux';
import { Grid, Typography, Button } from '@material-ui/core';
import { orderInfo } from '../../actions';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {
      margin: theme.spacing(3),
      padding: 0,
      backgroundColor: '#ccffff',
      boxShadow: '0 1rem 1rem grey',

    },
  
}));

export default function OutlinedCard() {
  const classes = useStyles();
  const info = useSelector(state => state.info);
  // dispatch add to info ADD_ADDRESS
  const dispatch = useDispatch();

  React.useEffect(() => {
        axios.get('/api/order-info')
        .then(res => dispatch(orderInfo(res.data[res.data.length-1 ])))
  }, [])


  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
            <Grid container spacing={1}>
                <Grid item xs={6}>
                    <Typography>
                        First Name: {info.first_name}
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography>
                        Last Name: {info.last_name}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography>
                        Address: {info.address}
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography>
                        State: {info.state}
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography>
                        City: {info.city}
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography>
                        Zip Code: {info.zip_code}
                    </Typography>
                </Grid>

                <Grid item xs={12}>
                    <Button color="secondary" variant="contained" fullWidth={true}>
                        Order
                    </Button>
                </Grid>
            
            </Grid>
      </CardContent>
    </Card>
  );
}
