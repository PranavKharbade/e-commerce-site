import React from 'react';
import { connect } from 'react-redux';

import { toggleCartHidden } from '../../redux/cart/cart.action';

import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';

import './cart-icon.styles.scss';

import {selectCartItemsCount} from '../../redux/cart/cart.selectors'
import { createSelector } from 'reselect';

const CartIcon = ({ toggleCartHidden,itemCount }) => (
  <div className='cart-icon' onClick={toggleCartHidden}>
    <ShoppingIcon className='shopping-icon' />
    <span className='item-count'>{itemCount}</span>
  </div>
);

const mapDispatchToProps = dispatch => ({
  toggleCartHidden: () => dispatch(toggleCartHidden())
});
// without selector
// const mapStateToProps=({cart:{cartItems}})=>({
//   itemCount:cartItems.reduce(
//     (accumalatedQuantity,cartItem)=>accumalatedQuantity+cartItem.quantity,0)
// })

// with selector
const mapStateToProps=(state)=>({
  itemCount:selectCartItemsCount(state)
    
})
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CartIcon);