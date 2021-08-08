import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './App.css';

import Imessage from './components/IMessage'
import { selectUser, login, logout } from './features/userSlice';
import Login from "./components/Login"

import { auth } from "./components/firebase";

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch()
  // console.log(`user --->`, user);

  useEffect(() => {
    auth.onAuthStateChanged(authUser => {
      if (authUser) {
        // User logge In
        dispatch(login({
          uid: authUser.uid,
          photo: authUser.photoURL,
          email: authUser.email,
          displayName: authUser.displayName,
        })); 
        console.log(`authUser`, authUser)
      } else {
        // User logge out
        dispatch(logout());
      }
    })

    return () => {
      console.log(`object`)
    }
  }, [])

  return (
    <div className="App">
      {user ? <Imessage /> : <Login />}
      
    </div>
  );
}

export default App;
