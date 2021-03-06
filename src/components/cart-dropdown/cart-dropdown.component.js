import React from 'react';
import { connect } from 'react-redux';

import CustomButton from '../custom-button/custom-button.component';
import CartItem from '../cart-item/cart-item.component';
import {selectCartItems} from '../../redux/cart/cart.selectors';
import { withRouter } from "react-router-dom";
import './cart-dropdown.styles.scss';
import {toggleCartHidden} from '../../redux/cart/cart.action'

// const CartDropdown = ({ cartItems }) => (
const CartDropdown = ({ cartItems,history,dispatch }) => (
  <div className='cart-dropdown'>
    <div className='cart-items'>
      {
        cartItems.length?(
      cartItems.map(cartItem => (
        <CartItem key={cartItem.id} item={cartItem} />
      ))
      ):(<span className='empty-message'>Your cart is Empty</span>)
      }
    </div>
    <CustomButton onClick={
      ()=>{history.push('/checkout');
      dispatch(toggleCartHidden())
    }}>GO TO CHECKOUT</CustomButton>
  </div>
);

// const mapStateToProps = ({ cart: { cartItems } }) => ({
//   cartItems
// });
const mapStateToProps = (state) => ({
   cartItems:selectCartItems(state)
  });

export default withRouter(connect(mapStateToProps)(CartDropdown));