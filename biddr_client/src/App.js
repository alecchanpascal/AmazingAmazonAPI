import './App.css';
import {Route, Switch, BrowserRouter} from 'react-router-dom';
import React, {useState, useEffect} from 'react';
import NavBar from './components/NavBar';
import WelcomePage from './components/WelcomePage';
import {User, Session} from './components/routes';
import AuctionIndexPage from './components/AuctionIndexPage';
import AuctionShowPage from './components/AuctionShowPage';
import NewAuctionPage from './components/NewAuctionPage';
import SignUpPage from './components/SignUpPage';
import SignInPage from './components/SignInPage';
import PageNotFound from './components/PageNotFound';
import AuthRoute from './components/AuthRoute';

function App() {
  const [state, setState] = useState({currentUser: null})

  function getUser(){
    User.current().then(data => {
      if (typeof data.id !== "number") {
        setState({currentUser: null});
      } else {
        setState({currentUser: data});
      }
    })
  }

  useEffect(() => {
    getUser()
  }, [])

  const destroySession = () => {
    Session.destroy().then(setState({currentUser: null}));
  }

  return (
    <BrowserRouter>
    <div className="ui container">
        <header>
          <NavBar currentUser={state.currentUser} signOut={destroySession}/>
        </header>
        <br></br>
        <Switch>
          <Route exact path="/" component={WelcomePage}/>
          <Route exact path="/auctions" component={AuctionIndexPage}/>
          <AuthRoute isAllowed={!!state.currentUser} exact path="/auctions/new" component={NewAuctionPage}/>
          <Route exact path="/auctions/:id" component={AuctionShowPage}/>
          <Route exact path='/sign_up' render={routeProps => (<SignUpPage {...routeProps} onSignUp={getUser}/>)}/>
          <Route exact path="/sign_in" render={routeProps => (<SignInPage onSignIn={getUser} {...routeProps}/>)}/>
          <Route component={PageNotFound}/>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
