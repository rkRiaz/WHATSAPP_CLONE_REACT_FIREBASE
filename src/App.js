import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
import './App.css';
import Chat from './Chat';
import Login from './Login';
import Sidebar from './Sidebar';
// import axios from 'axios'



function App() {
  
const[user, setUser] = useState(null)

  useEffect(() => {

  }, [])

  return (
    <div className="app">
      {!user ? (
        <Login/>
      ) : 
      <div className="app__body">
        <Router>
            <Sidebar/>
            <Switch>
              <Route path="/rooms/:roomId">
                <Chat/>
              </Route>
              <Route path="/">
                <h2>Home Screen</h2>
              </Route>
            </Switch>
        </Router>
      </div>
      }

    </div>
  );
}

export default App;
