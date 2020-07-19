import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import CartIcon from '../cart-icon/cart-icon.component'
import { auth } from '../../firebase/firebase.utils';
import CartDropdown from "../cart-dropdown/cart-dropdown.component";
import { ReactComponent as Logo } from '../../assets/crown.svg';
import {  selectCartHidden} from "../../redux/cart/cart.selectors";
import {  selectCurrentUser} from "../../redux/user/user.selectors";
import {createStructuredSelector} from 'reselect';

import './header.styles.scss';


const Header = ({ currentUser ,hidden}) => (
  <div className='header'>
    <Link className='logo-container' to='/'>
      <Logo className='logo' />
    </Link>
    <div className='options'>
      <Link className='option' to='/shop'>
        SHOP
      </Link>
      <Link className='option' to='/shop'>
        CONTACT
      </Link>
      {currentUser ? (
        <div className='option' onClick={() => auth.signOut()}>
          SIGN OUT
        </div>
      ) : (
        <Link className='option' to='/signin'>
          SIGN IN
        </Link>
      )}
       <CartIcon/>
    </div>
 {hidden?null: <CartDropdown/>
 }
  
  </div>
);
const mapStatesToProps=createStructuredSelector({
  currentUser:selectCurrentUser,
  hidden:selectCartHidden
  })
  // if selector are less
// const mapStatesToProps=(state)=>({
//   currentUser:selectCurrentUser(state),
//   hidden:selectCartHidden(state)
//   })
// state is rootreducer.....without selector
// const mapStatesToProps=({user:{currentUser},cart:{hidden}})=>({
// currentUser,
// hidden
// })
export default  connect(mapStatesToProps)(Header);