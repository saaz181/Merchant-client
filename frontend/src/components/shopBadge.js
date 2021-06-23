import React from 'react';
import Badge from '@material-ui/core/Badge';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { useSelector, useDispatch } from 'react-redux';

const StyledBadge = withStyles((theme) => ({
  badge: {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}))(Badge);

export default function CustomizedBadges(props) {
    const counter = useSelector(state => state.counter)

    return (
    <IconButton aria-label="cart">
      <StyledBadge badgeContent={`${counter}`} color="secondary">
        <ShoppingCartIcon style={{color: 'white'}} />
      </StyledBadge>
    </IconButton>
  );
}
