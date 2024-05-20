import { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from "axios";
import PostLink from './posts/postLink';
import { Link } from "react-router-dom";

class Featured extends Component {
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
        console.log(this.state.id);
        axios
        .get('/api/posts/'+this.state.id)
        .then((res) => {this.setState({post: res.data}); console.log(res.data);})
        .catch((err) => console.log(err));
    }

    render() {
        return (
            <li>
                <article>
                <PostLink link={this.state.post.link} />
                <h1>{this.state.post.title}</h1>
                <Link className="wrapper-link" to={"/post/" + this.state.post.id}></Link>
                </article>
            </li>
        );
    }
}

export default Featured;