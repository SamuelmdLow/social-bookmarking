import { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from "axios";
import Post from './posts/post'
import Featured from './featured';
import Cover from './cover';
import ReactDOM from "react-dom/client";
import { Link, Outlet, useLoaderData, } from "react-router-dom";
import Home from './Home';
import PostPage from './PostPage';

class App extends Component {

  render() {
  return (
    <>
    <div className="tab-container">
    <a href="#home"><div className="tab">Home</div></a>
    </div>
    <div id="window" className="window-container">
      <Home/>
      <Outlet />
      <div className="windowEnd"></div>
    </div>
    </>
  );
  }
}

export default App;
