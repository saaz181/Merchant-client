import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {useSelector, useDispatch} from 'react-redux';
import DeleteIcon from '@material-ui/icons/Delete';
import { IconButton, Snackbar } from '@material-ui/core';
import axios from 'axios';
import {editQuantity, openSnack, removeFromCartCount, totalOff, totalPrice, final} from '../actions';
import TextField from '@material-ui/core/TextField';
import {countryData} from './countries';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const addToTableRow = (data) => {
  if (data) {
    var result = Object.keys(data).map((key) => [data[key]]);
    return result;
  }   
}

const convert = (big_number) => {
  const values = {
      million: 1000000,
      billion: 1000000000
  }
  if (big_number / values.million >= 1) return (big_number / values.million).toString().substr(0, 5) + ' M';
  else if (big_number / values.billion >= 1) return (big_number / values.billion).toString().substr(0, 5) + ' B';
  else return big_number;
}

export default function Cart(props) {
  const classes = useStyles();
  const {header} = props;
  const cart = useSelector(state => state.cart);
  const [msg, setMsg] = React.useState({
    message: '',
    type: ''
  })
  console.log(window.location.pathname == '/cart')
  const dispatch = useDispatch();
  const calcs = useSelector(state => state.calcs)

  const deleteProduct = async (id) => {
    axios.delete(`/api/create-cart/${id}`)
    .then(response => {
      if (response.status == 204) {
        dispatch(openSnack());
        setMsg({message: 'Item Deleted successfully', type: 'success'});
        dispatch(removeFromCartCount());
        
      } else {
        dispatch(openSnack())
        setMsg({message: 'Issue with Deleting Item', type: 'error'})

      }
      ;
    })
    await window.location.reload();
  }
  

  const updateQuantity = (idx, event) => {
    const formData = new FormData();
    let quantity = event.target.value;
    formData.append('quantity', quantity);
  
    axios.put(`/api/create-cart/${idx}`, formData)
    dispatch(editQuantity(idx, parseInt(quantity)));
    dispatch(final(cart));
    dispatch(totalOff(cart));
    dispatch(totalPrice(cart));

  }
  
  useEffect(() => {
      dispatch(final(cart));
      dispatch(totalOff(cart));
      dispatch(totalPrice(cart));
    }, [cart])

    return (
    <TableContainer component={Paper} style={{overflowY: 'scroll', overflowX: 'scroll', height: '100vh'}}>
      {header}
      <Table className={classes.table} aria-label="caption table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Quantity</TableCell>
            <TableCell rowSpan={1} align="right">Price (ريال)</TableCell>
            <TableCell align="right">Off Price (ريال)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cart && addToTableRow(cart).map((row) => (
            <TableRow key={row[0].id}>
              <TableCell component="th" scope="row">
                {row[0].product.product_name}
              </TableCell>
              <TableCell align="right">
                      <TextField
                          id="standard-number"
                          type="number"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          InputProps={{
                            inputProps: { 
                                max: row[0].product.quantity, min: 1
                            }
                          }}
                          onChange={event => updateQuantity(row[0].id, event, row[0].quantity)}
                          defaultValue={row[0].quantity}
                          size='small'
                        />
                </TableCell>
              <TableCell align="right">{convert(row[0].product.price)}</TableCell>
              <TableCell align="right">{row[0].product.off ? convert(row[0].product.off) : 0}</TableCell>
              <TableCell align="right">
                <IconButton size='small' onClick={() => deleteProduct(row[0].id)}>
                  <DeleteIcon color='secondary' />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}

        <TableRow>
            <TableCell rowSpan={3} />
            <TableCell colSpan={2}></TableCell>
            <TableCell align="left"></TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Total</TableCell>
            <TableCell align="right">{calcs.total.toLocaleString()}</TableCell>
            <TableCell align="right">{calcs.off.toLocaleString()}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell >Final Payment</TableCell>
            <TableCell align="right">{calcs.final.toLocaleString()}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Snackbar message={msg.message} type={msg.type} />
    </TableContainer>
  );
}
