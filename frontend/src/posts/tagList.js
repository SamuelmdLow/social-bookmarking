import { Component, useEffect } from 'react';
import axios from "axios";
import { Link } from "react-router-dom";

export default function TagList({tags_id, all_tags=false, set_tags=false}) {
    var tags =  [],

    tags = tags_id;
    
    if(all_tags) {
        for(var item in tags_id) {
            var id = String(tags_id[item]);
            
            if(!(id in all_tags)) {

                axios
                .get('/api/tags/'+id)
                .then((res) => {
                    var new_all_tags = all_tags;
                    new_all_tags[id] = res.data;
                    set_tags(new_all_tags);

                    tags[item] = res.data;
                })
                .catch((err) => console.log(err));
            } else {
                tags[item] = all_tags[id];
            }
        }       
    } else {
    
        for(var item in tags_id) {
            var id = String(tags_id[item]);    
            axios
            .get('/api/tags/'+id)
            .then((res) => {
                tags[item] = res.data;
            })
            .catch((err) => console.log(err));
        }
    }


    return (
        <ul className="tag-list">{tags.map(tag =>
            <li key={tag.id} style={{"--main_colour": tag.colour, "--contrast_colour": tag.contrast_colour}}>
                <Link to={"/tag/" + tag.slug}>{tag.name}</Link>
            </li>
        )}</ul>
    );

}