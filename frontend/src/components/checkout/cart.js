import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper
} from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { final, totalOff, totalPrice } from '../../actions';


const useStyles = makeStyles((theme) => ({
  table: {
      
},
  tableContainer : {
    overflowY: 'scroll', 
    overflowX: 'scroll', 
    height: '100vh',
    backgroundImage: 'linear-gradient(to bottom ,#ffffcc, #ffffb3, #ffff99)',
  }

}));

const makeCartObj = (data) => {
    if (data) {
      let result = Object.keys(data).map((key) => [data[key]]);
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
  


export default function DenseTable() {
  const classes = useStyles();
  const cart = useSelector(state => state.cart);
  const calcs = useSelector(state => state.calcs);
  const info = useSelector(state => state.info)
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(final(cart));
    dispatch(totalOff(cart));
    dispatch(totalPrice(cart));
  }, [cart])


  return (
    <TableContainer component={Paper} className={classes.tableContainer}>
      <Table className={classes.table} aria-label="caption table" size='small'>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Quantity</TableCell>
            <TableCell rowSpan={1} align="right">Price (ريال)</TableCell>
            <TableCell align="right">Off Price (ريال)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cart && makeCartObj(cart).map((row) => (
            <TableRow key={row[0].id}>
              <TableCell component="th" scope="row">
                {row[0].product.product_name}
              </TableCell>
              <TableCell align="right"> {row[0].quantity} </TableCell>
              <TableCell align="right">{convert(row[0].product.price)}</TableCell>
              <TableCell align="right">{row[0].product.off ? convert(row[0].product.off) : 0}</TableCell>
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
    </TableContainer>
 
  );
}
