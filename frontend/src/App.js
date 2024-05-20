import { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from "axios";
import Post from './posts/post'
import Featured from './featured';
import Cover from './cover';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from './Home'

class App extends Component {

  render() {
  return (
    <>
    <div className="tab-container">
    <Link to="/"><div className="tab">Home</div></Link>
    </div>
    <div className="window-container">
      <Home/>
      <Routes>
        <Route path='/post/:postId' element={ <div className="window"><h1>Sorry, what?</h1></div> } />
      </Routes>
    </div>
    </>
  );
  }
}

export default App;
