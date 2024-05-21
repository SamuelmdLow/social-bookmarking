import { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from "axios";
import PostLink from './posts/postLink';
import { Link } from "react-router-dom";

class Cover extends Component {
    constructor(props) {
        super(props);
        this.state = {
          id: props.id,
          post: {link: ""},
        };
      }
    
    componentDidMount() {
        this.loadPosts();
    }
    
    loadPosts = () => {
        axios
        .get('/api/posts/'+this.state.id)
        .then((res) => {this.setState({post: res.data});})
        .catch((err) => console.log(err));
    }

    render() {
        return (
            <article className='cover'>
                <PostLink link={this.state.post.link} />
                <img src="https://www.tubbdoose.com/static/posts/summer2023/summer2023.png"></img>
                <h1>{this.state.post.title}</h1>
                <Link className="wrapper-link" to={"/post/" + this.state.post.id}></Link>
            </article>
        );
    }
}

export default Cover;