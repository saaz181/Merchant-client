import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import Header from './Header';
import Content from './content';

const useStyles = makeStyles((theme) => ({
  scroll: {
      overflowY: 'scroll',
      height: '100vh'
  }
}));

export default function RecipeReviewCard() {
  const classes = useStyles();
  
  return (
    <Grid container direction='column' className={classes.scroll}>
        <Grid item>
            <Grid item>
                <Header />
            </Grid>
            <Grid item container>
                <Grid item xs={12} sm={2} />
                <Grid item xs={12} sm={8} >
                    <Content />
                </Grid>
            </Grid>
            <Grid item xs={0} sm={2}>
                
            </Grid>
        </Grid>
    </Grid>
  );
}
