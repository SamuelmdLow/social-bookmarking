import { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './branding.css';
import axios from "axios";
import Post from './posts/post'
import Featured from './featured';
import Cover from './cover';
import ReactDOM from "react-dom/client";
import { Link, Outlet, useLoaderData, } from "react-router-dom";
import Home from './Home';
import PostPage from './PostPage';

export class App extends Component {

  render() {
  return (
    <>
    <div className="tab-container">
    <Link to="/"><div className="tab">Home</div></Link>
    <a href="#writePost" className="post-tab"><div className="tab">🖋️Post</div></a>
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

export class MobileApp extends Component {

  render() {
  return (
    <>
    <div className="tab-container">
    <Link to="/"><div className="tab">Home</div></Link>
    <a href="#writePost" className="post-tab"><div className="tab">🖋️Post</div></a>
    </div>
    <div id="window" className="window-container">
      <Outlet />
      <div className="windowEnd"></div>
    </div>
    </>
  );
  }
}