import React, { useState, useEffect } from 'react';
import axios from 'axios';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory
} from 'react-router-dom';
import SignUp from './components/SignUp';
import Home from './components/Home';
import SignIn from './components/SignIn';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));

function App(props) {
  const classes = useStyles();
  let history = useHistory();
  const [values, setValues] = useState({
    loggedIn: localStorage.getItem('token') ? true : false,
    currentUser: ''
  });

  const logout = () => {
    localStorage.removeItem('token');
    setValues({ loggedIn: false, currentUser: '' });
    console.log(values);
  };
  useEffect(() => {
    let token = localStorage.getItem('token');
    if (token != null) {
      axios('/user_auth/current_user', {
        headers: {
          Authorization: `JWT ${token}`
        }
      })
        .then(response => {
          if (response.data.username !== undefined) {
            setValues({ loggedIn: true, currentUser: response.data.username });
          } else if (response.data.detail == 'Signature has expired.') {
            localStorage.removeItem('token');
            setValues({ loggedIn: false, currentUser: '' });
            alert('Log In Expired. Log In Again');
          }
        })
        .catch(err => console.log(err));
    }
  });
  return (
    <>
      <div className={classes.root}>
        <AppBar position='static'>
          <Toolbar>
            <Typography
              variant='h6'
              className={classes.title}
              onClick={() => history.push('/')}
            >
              JWT
            </Typography>
            {values.loggedIn == false || localStorage.token == undefined ? (
              <Button color='inherit' onClick={() => history.push('/sign-in')}>
                Login
              </Button>
            ) : (
              <Button color='inherit' onClick={logout}>
                Logout
              </Button>
            )}
          </Toolbar>
        </AppBar>
      </div>
      <Switch>
        <Route exact path='/sign-in' component={SignIn} />
        <Route exact path='/sign-up' component={SignUp} />
        <Route path='/' component={Home} />
      </Switch>
    </>
  );
}

export default App;
