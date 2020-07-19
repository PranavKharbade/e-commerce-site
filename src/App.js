import React from 'react';
import { Switch, Route,Redirect } from 'react-router-dom';
import {connect} from 'react-redux';
import './App.css';
import {setCurrentUser} from './redux/user/user.action';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import Header from './components/header/header.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { selectCurrentUser } from './redux/user/user.selectors';
import CheckoutPage from './pages/checkout/checkout.component';


class App extends React.Component {
  

  unsubscribeFromAuth = null;

  componentDidMount() {
    const {setCurrentUser}=this.props;
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if(userAuth){
        const userRef=await createUserProfileDocument(userAuth);
        userRef.onSnapshot(snapShot=>{
          
         setCurrentUser({
              id:snapShot.id,
              ...snapShot.data()
            });
          console.log(this.state)
        })
      }
    // createUserProfileDocument(user)
    
      // this.setState({ currentUser: user });
      // console.log(user);
      setCurrentUser(userAuth);
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    console.log("userprops",this.props.currentUser);
    return (
      <div>
        <Header/>
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route exact path='/checkout' component={CheckoutPage} />
          {/* {console.log("userprops",this.props.currentUser)} */}
          <Route exact path='/signin' 
          render={()=>this.props.currentUser?
          (<Redirect to='/' />)
          :(<SignInAndSignUpPage/>)} />
        </Switch>
      </div>
    );
  }
}


const mapStateToProps=(state)=>({
    currentUser:selectCurrentUser(state)
  })
// const mapStateToProps=({user})=>({
//   currentUser:user.currentUser
// })

const mapDispatchToProps=dispatch=>({
  setCurrentUser:user=>dispatch(setCurrentUser(user))
})
export default connect(mapStateToProps,mapDispatchToProps)(App);