import { useState } from 'react';
import axios from "axios";
import { format } from "date-fns";

export default function Post({data}) {

    return (
    <div className="post">
        <div className="post_left">
            <p className="post_date">{format(data["date"], "d/M/y")}</p>
            <div className="post_icon"></div>
        </div>


        <div className="post_right">
        <p className="post_text"><b>{data["title"]}</b> {data["desc"]}</p>
        <a className="post_link" href={data["link"]}>{data["link"].replace("https://www.", "").replace("http://www.", "").replace("https://", "").replace("http://", "")}</a>
        </div>
    </div>);
}