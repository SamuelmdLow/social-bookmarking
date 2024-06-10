import { Component } from 'react';
import axios from "axios";
import { Link } from "react-router-dom";

class TagList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tags_id: props.tags_id,
            tags: [],
        };
      }
    
    componentDidMount() {
        this.loadTags();
    }
    
    loadTags = () => {
        this.setState({tags: this.props.tags_id});
        
        if(this.props.all_tags) {
            for(var item in this.state.tags_id) {
                var id = String(this.state.tags_id[item]);
                
                if(!(id in this.props.all_tags)) {
    
                    axios
                    .get('/api/tags/'+id)
                    .then((res) => {
                        var new_all_tags = this.props.all_tags;
                        new_all_tags[id] = res.data;
                        this.props.set_tags(new_all_tags);
                        var new_tags = this.state.tags;
                        new_tags[item] = this.props.all_tags[id];
                        this.setState({tags: new_tags});
                    })
                    .catch((err) => console.log(err));
                } else {
                    var new_tags = this.state.tags;
                    new_tags[item] = this.props.all_tags[id];
                    this.setState({tags: new_tags});
    
                }
            }       
        } else {
            for(var item in this.state.tags_id) {
                var id = String(this.state.tags_id[item]);    
                axios
                .get('/api/tags/'+id)
                .then((res) => {
                    var new_tags = this.state.tags;
                    new_tags[item] = res.data;
                    this.setState({tags: new_tags});
                })
                .catch((err) => console.log(err));
            }
        }
    }

    render() {
        return (
            <ul className="tag-list">{this.state.tags.map(tag =>
                <li key={tag.id} style={{"--main_colour": tag.colour, "--contrast_colour": tag.contrast_colour}}>
                    <Link to={"/tag/" + tag.slug}>{tag.name}</Link>
                </li>
            )}</ul>
        );
    }
}

export default TagList;