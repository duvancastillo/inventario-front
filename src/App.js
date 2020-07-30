import React from 'react';
import './App.css';
import Articles from './componets/Articles';
import Home from './componets/Home';
import Registro from './componets/Registro'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <div >
          <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-primary">
              <div className="collapse navbar-collapse" id="navbarText">
                <ul className="navbar-nav mr-auto">
                  <li className="nav-item active">
                    <a className="nav-link" href="/Home">Home</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/article">Articles</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/registro">Registre</a>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        
          <Switch>
            <Route path="/article">
              <Articles />
            </Route>
            <Route path="/registro">
              <Registro />
            </Route>
            <Route path="/">
              <Home />
            </Route>
            
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
