import { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from "axios";
import Post from './posts/post'
import Featured from './featured';
import Cover from './cover';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, useLoaderData } from "react-router-dom";
import PostLink from './posts/postLink';
import { format } from "date-fns";

async function getPost(id) {
    var data = {title: 'hi'};
    await axios
    .get('/api/posts/' + id)
    .then((res) => data = res.data)
    .catch((err) => console.log(err));

    return data;
}

export async function loader({ params }) {
    const data = await getPost(params.postId);
    return {data};
}

export default function PostPage() {
    const {data} = useLoaderData();

      return (
        <div className="window" id={data.id.toString()}>
            <a href={"#" + data.id.toString()} className="window-topbar">
                bookmark/{data.title}
            </a>
            <div className="window-content">
                <div className="bookmark-bg">
                    <div className="bookmark-preview">
                    <PostLink link={data["link"]} />
                    </div>
                    <div className="bookmark-comment">
                        <p className="post_date">{format(data["date"], "d/M/y")}</p>
                        <p><b>{data.title}</b> {data.desc}</p>
                    </div>
                </div>
            </div>
    </div>
  );
}

