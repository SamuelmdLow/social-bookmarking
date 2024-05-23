import { useState } from 'react';
import axios from "axios";
import { format } from "date-fns";
import PostLink from './postLink';
import { Link } from "react-router-dom";

export default function Post({data}) {

    return (
    <div className="post">
        <div className="post_left">
            <p className="post_date">{format(data["date"], "d/M/y")}</p>
            <img className="post_icon" src={data["icon"]}></img>
        </div>

        <div className="post_right">
        <p className="post_text"><b>{data["title"]}</b> {data["desc"]}</p>
        <PostLink link={data["link"]} />
        </div>
        <Link className="wrapper-link" to={"/post/" + data["id"]}></Link>
    </div>);
}