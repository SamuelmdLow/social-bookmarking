import { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from "axios";

class Featured extends Component {
    constructor(props) {
        super(props);
        this.state = {
          id: props.id,
          post: {},
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
                <a className="post_link" href={this.state.post.link}>{this.state.post.link}</a>
                <h1>{this.state.post.title}</h1>
                </article>
            </li>
        );
    }
}

export default Featured;