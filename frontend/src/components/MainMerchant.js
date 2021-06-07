import React, {Component, useState} from 'react';



export default function MainMerchant (props) {
    const merchatId = props.match.params.merchantId;
    const [state, setState] = useState({
        name: '',
        firstName: '', 
        lastName: '',
        phone: '',
        merchantLogo: '',
        country: '',
        province: '',
        city: '',
        email: '',
        isMerchant: '',
        created_at: '',
        creditCard: '',
        shabaCode: ''
    })

    const getInfo = () => {
        fetch('/api/get-merchant-info' + '?id=' + merchatId)
        .then((response) => {
            if (response.ok) return response.json();
            else console.log('error occurred');
        })
        .then((data) => {
            return data;
        })
    }

    return (
        <h4>{getInfo()}</h4>
    );
}