import { useState } from 'react';
import axios from "axios";
import { format } from "date-fns";
import PostLink from './postLink';
import { Link } from "react-router-dom";
import TagList from './tagList';

export default function Post({data, all_tags, set_tags}) {
    return (
    <div className="post">
        <div className="post_left">
            <p className="post_date">{format(data["date"], "d/M/y")}</p>
            <img className="post_icon" src={data["icon"]}></img>
        </div>

        <div className="post_right">

        {data["tags"].length > 0 &&  <TagList tags_id={data["tags"]} all_tags={all_tags} set_tags={set_tags} /> }

        <p><b>{data["title"]}</b> {data["desc"]}</p>
        <PostLink link={data["link"]} />
        </div>
        <Link className="wrapper-link" to={"/post/" + data["id"]}></Link>
    </div>);
}