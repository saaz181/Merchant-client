import React, {useState, useEffect} from 'react'
import CustomCard from './Card';
import { Grid } from '@material-ui/core';


const Content = (props) => {
    const getProductObj = (productObj, avatar, isMerchant, merchantId, cartFunc) => {
        return (
            <Grid item xs={12} sm={6} md={4}>
                <CustomCard {...productObj} avatarSrc={avatar} isMerchant={isMerchant} merchantId={merchantId} cart={cartFunc}/>
            </Grid>
        );
        
    }

    const { product, logo, isMerchant, merchantId, cart } = props;    

    return (
        <Grid container spacing={4}>
            {product.map(productObj => getProductObj(productObj, logo, isMerchant, merchantId, cart))}        
        </Grid>
        ); 
    
}

export default Content;
