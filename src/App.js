import React from 'react';
import './App.scss';
import Header from './components/header/Header';
import Weather from './pages/weather/Weather';
import Favorites from './pages/favorites/Favorites';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";


const App = () => {
  return (
    <div className="App">
      <Router>
        <Header></Header>
        <Switch>

          <Route path="/favorites">
            <Favorites></Favorites>
          </Route>

          <Route path="/">
            <Weather></Weather>
          </Route>

        </Switch>
      </Router>
    </div>
  );
}

export default App;
