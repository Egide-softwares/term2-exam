import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Home } from './pages/Home';
import { About } from './pages/About';

function App() {
  return (
    <Router>
      <div className="App">
        <img src={logo} className="App-logo" alt="logo" />
        <header className="App-header">
          <Link to="/">Home</Link> &emsp;
          <Link to="/about">About</Link>
        </header>
        <div>
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
        </div>
      </div>
    </Router>
  );
}

export default App;
