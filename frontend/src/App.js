import { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from "axios";
import Post from './posts/post'

class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
    };
  }

  componentDidMount() {
    this.loadPosts();
  }

  loadPosts = () => {
    axios
    .get('/api/posts/?page=1')
    .then((res) => this.setState({posts: res.data.results}))
    .catch(function (error) {
      // handle error
      console.log(error);
    });
  };

  render() {
  return (
    <>
    <div className="tab-container">
      <div className="tab">Home</div>
    </div>
    <div className="window-container">

    <div className="window">
      <article className="coverstory">
        <h1>{this.state.posts.length > 0  && this.state.posts[0].title}</h1>
      </article>
      <div className="topstories">
        <ul>{this.state.posts.slice(1).map(post =>
          <li key={post.id.toString()}>{post.title}</li>
        )}</ul>  
      </div>

      <div className="feed">
      <h1>Feed</h1>
      <h2>This Week</h2>
      <ul className="post-list">{this.state.posts.map(post =>
          <li key={post["id"].toString()}><Post data={post} /></li>
        )}</ul>   
      </div>   
    </div>

    </div>
    </>
  );
  }
}

export default App;
