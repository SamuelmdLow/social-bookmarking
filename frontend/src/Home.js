import { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from "axios";
import Post from './posts/post'
import FeedGroup from './posts/feedGroup';
import Featured from './featured';
import Cover from './cover';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      featured: [],
      posts: [],
      tags: {},
    };
    console.log("home tags");
    console.log(this.state.tags);
  }

  componentDidMount() {
    this.loadPosts();
  }

  loadPosts = () => {
    axios
    .get('/api/posts/?ordering=-date&page=1')
    .then((res) => this.setState({posts: res.data.results}))
    .catch((err) => console.log(err));

    axios
    .get('/api/featured_posts')
    .then((res) => this.setState({featured: res.data.results}))
    .catch((err) => console.log(err));
  };

  render() {
  return (
    <div className="window home" id="home">
        <a href="#home" className="window-topbar"></a>
      <div className="banner"></div>
      <div className="window-content">
      {this.state.featured.length > 0 &&
        <div className="featured">
          <div className="left">
            <Cover id={this.state.featured[0].post} />
          </div>
        <div className="right">
          <ol>{this.state.featured.slice(1).map(post =>
            <Featured key={post.id} id={post.post}/>
          )}</ol>  
        </div>
      </div>
      }

      <div className="feed">
        <h1>Feed</h1>
        <FeedGroup posts={this.state.posts} all_tags={this.state.tags} set_tags={(t) => this.setState({tags : t})} />
      </div>
      </div>   
    </div>
  );
  }
}

export default Home;
