import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Grid, Typography } from "@material-ui/core";
import StarRatingComponent from "react-star-rating-component";
import StarRateIcon from "@material-ui/icons/StarRate";

const useStyles = makeStyles((theme) => ({
   root: {
       borderRadius: '10px',
       boxShadow: '1px 1px'
   }
}));

export default function ProductCard(props) {
  const classes = useStyles();
  const { price, offPrice, quantity, star, saler } = props;
  return (
    <Card variant="outlined" className={classes.root}>
      <CardContent>
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <Typography variant="body2" compact="body">
              Price:{" "}
              {offPrice != 0 ? (
                price
              ) : (
                <span style={{ color: "red" }}>
                  <del>{price}</del> {offPrice}
                </span>
              )}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" compact="body">
              Quantity: {quantity}
            </Typography>
          </Grid>
          
          <Grid item xs={12} align="center">
            <StarRatingComponent
              name="Product Rating"
              starCount={5}
              renderStarIcon={() => <StarRateIcon fontSize="large" />}
              value={star}
              editing={false}
            />
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" compact="body">
              From: {saler}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
