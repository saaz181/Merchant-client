import React from 'react'
import axios from 'axios';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { useDispatch, useSelector } from 'react-redux';
import { orderInfo, disableForm, enableForm } from '../../actions';


function AddressCard(props) {
    const [address, setAddress] = React.useState([]);
    const dispatch = useDispatch();

    React.useEffect(() => {
        axios.get('/api/order-info')
        .then(res => setAddress(res.data));
    }, [])

    
    const handleChange = (event) => {
        const addrs = event.target.value;
        dispatch(enableForm());
        dispatch(orderInfo(address[addrs]));
        if (addrs) dispatch(disableForm());
        
      };

    return (
        <FormControl>
            <Select
                native
                variant='outlined'
                onChange={handleChange}
                >
            <option aria-label='Address' value=''> Address </option>
            {address && address.map((item, pos) => {
                return (
                    <option key={pos} value={pos}>
                        {item.address} | {item.first_name} {item.last_name} 
                    </option>
                );
            })}
            </Select>
      </FormControl>
    )
}

export default AddressCard;
