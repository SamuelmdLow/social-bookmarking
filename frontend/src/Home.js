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
      page: 2,
    };
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

  loooog = () => {
    axios
    .get('/api/posts/?ordering=-date&page=' + String(this.state.page))
    .then((res) => {
      this.setState({posts: this.state.posts.concat(res.data.results)});
      this.setState({page: this.state.page + 1});
      })
    .catch((err) => {
      console.log("End of feed");
      document.getElementById("feed-end").remove();
    }
    );
  };

  render() {
  return (
    <div className="window home full-window" id="home">
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
        <FeedGroup posts={this.state.posts} />
        <div id="feed-end" className="feed-flex">
          <div className="left">
            <button onClick={this.loooog}>Load More</button>
          </div>
        </div>
      </div>
      </div>   
    </div>
  );
  }
}

export default Home;
