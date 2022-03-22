import React from 'react';
import { Switch, Route ,Redirect} from 'react-router-dom';
import { connect } from 'react-redux';


import './App.css';
import Header from './components/header/header.component';
import { auth ,createUserProfileDocument} from './firebase/firebase.utils';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/pages/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
// import ShopPage from './pages/shop/shop.component.jsx';
import {setCurrentUser} from './redux/user/user.actions'


class App extends React.Component {
  // constructor()
  // {
  //   super();
  //   this.state={
  //     currentUser:null
  //   }
  // }

  unsubscribeFromAuth=null;

  componentDidMount(){

    const {setCurrentUser}=this.props;

    this.unsubscribeFromAuth= auth.onAuthStateChanged(async userAuth=>
      {
        if(userAuth)
        {
          const userRef=await createUserProfileDocument(userAuth);
          userRef.onSnapshot(snapShot=>
            {
              // this.setState({
              //   currentUser:{
              //     id:snapShot.id,
              //     ...snapShot.data()
              //   }
              // });

              setCurrentUser({
                
                  id:snapShot.id,
                  ...snapShot.data()
                
              });

            });
        }
        setCurrentUser(userAuth );
        // this.setState({currentUser:userAuth});
        // this.setState({currentUser:user});

        //  createUserProfileDocument(user);
      })
  }

  componentWillUnmount(){
    this.unsubscribeFromAuth();
  }

  render() {

    return (
      <div>
         <Header  />
        {/* <Header currentUser={this.state.currentUser} /> */}
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route path='/signin' component={SignInAndSignUpPage} />
        </Switch>
      </div>
    );
  }
}

const mapDispatchToProps=dispatch=>({
  setCurrentUser:user=>dispatch(setCurrentUser(user))
})

export default connect(null,mapDispatchToProps)(App);