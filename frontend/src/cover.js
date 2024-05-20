import { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from "axios";

class Cover extends Component {
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
        .then((res) => {this.setState({post: res.data}); console.log(res.data); console.log(this.state.post);})
        .catch((err) => console.log(err));
    }

    render() {
        return (
            <article className='cover'>
                <img src="https://www.tubbdoose.com/static/posts/summer2023/summer2023.png"></img>
                <h1>{this.state.post.title}</h1>
            </article>
        );
    }
}

export default Cover;