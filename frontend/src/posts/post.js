import { useState } from 'react';
import axios from "axios";
import { format } from "date-fns";
import PostLink from './postLink';
import { Link } from "react-router-dom";
import TagList from './tagList';

function formatePubDate(value) {
    const today = new Date();
    const date = new Date(value);

    const second = 1000
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const delta = new Date(today.getTime()-date.getTime());

    if ((delta/day) > 1) {
        return String(Math.floor(delta/day)) + "d ago";
    } else if (delta/hour > 1){
        return String(Math.floor(delta/hour)) + "h ago"
    } else if ((delta/minute) > 1) {
        return String(Math.floor(delta/minute)) + "m ago"
    } else {
        return String(Math.floor(delta/second)) + "s ago"
    }
}

export default function Post({data, all_tags, set_tags}) {
    return (
    <div className="post">
        <div className="post_left">
            <p className="post_date">{formatePubDate(data["date"])}</p>
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