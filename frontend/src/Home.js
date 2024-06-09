import { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from "axios";
import Post from './posts/post'
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

  groupPosts(total, value, index) {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const today = new Date();
    const date = new Date(value["date"]);
    if(index === 0 ) {
      total = [];
    }

    const delta = new Date(today.getTime()-date.getTime());

    if(Math.abs(delta.getUTCDate() - 1) <= 7 && delta.getUTCMonth()==0 && delta.getUTCFullYear()==1970) {

      if(index === 0 ) {
        total.push({"header": "This Week", "posts": []});
      }
    } else {
      var year = "";
      if(today.getFullYear() != date.getFullYear()) {
        year = " " + String(date.getFullYear());
      }
      if(index === 0 ) {
        total.push({"header": months[date.getMonth()] + year, "posts": []});
      } else {
        const last_date = new Date(total[total.length-1]["posts"][total[total.length-1]["posts"].length-1]["date"]);

        if(last_date.getMonth() != date.getMonth() || last_date.getFullYear()!=date.getFullYear()) {
          total.push({"header": months[date.getMonth()] + year, "posts": []});
        } 
      }
    }
    total[total.length-1]["posts"].push(value);
    return total;
  }

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
        {this.state.posts.reduce(this.groupPosts, []).map(postGroup =>
        <div className="feed-flex">
            <div className="left">
            <h2>{postGroup["header"]}</h2>
            <ul className="post-list">{postGroup["posts"].map(post =>
              <li key={post["id"].toString()}><Post data={post} all_tags={this.state.tags} set_tags={(t) => this.setState({tags : t})} /></li>
            )}
            </ul>
            </div>
            <div className="right"></div>
          </div>
          )}
      </div>
      </div>   
    </div>
  );
  }
}

export default Home;
