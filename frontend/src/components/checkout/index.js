import { Grid } from '@material-ui/core';
import React from 'react'
import DenseTable from './cart';
import OutlinedCard from './Info';

function Checkout() {
    return (
        <Grid container direction='column'>
        <Grid item>
            <Grid item>
                
            </Grid>
            <Grid item container>
                <Grid item xs={12} sm={2} />
                <Grid container item xs={12} sm={8} spacing={2}>
                    <Grid item xs={12}>
                        <OutlinedCard />

                    </Grid>
                    <Grid item xs={12}>
                        <DenseTable />
                    </Grid>
                </Grid>
            </Grid>

            <Grid item xs={0} sm={2} />
        </Grid>
    </Grid>
    )
}

export default Checkout;
