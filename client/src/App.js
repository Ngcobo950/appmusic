import React from 'react';

import './App.css';
import { HashRouter as Router, Switch, Route, Link } from "react-router-dom";
import 'font-awesome/css/font-awesome.min.css';


import Home from './components/Home'
import Music from './components/Music';
import Books from './components/Books';
import Favorite from './components/Favorite';

//component that will render home, music and books and return them as a path
class App extends React.Component {
  cons
  render(){
    return (
      <Router >
        <Home/>
        <div>
          <nav>
            <ul>
              <li>
                <Link to={'/'}>Home</Link>
              </li>
              <li>
                <Link to={'/Music'}>Music</Link>
              </li>
              <li>
                <Link to={'/Books'}>Books</Link>
              </li>
              <li>
                <Link to={'/Favorite'}>Favorites</Link>
              </li>
            </ul>
          </nav>
          <Switch>
//Paths to access music home and books
          <Route path='/Home' component={Home}/>
            <Route path='/Music' component={Music}/>
            <Route path='/Books' component={Books}/>
            <Route path='/Favorite' component={Favorite}/>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
