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
import TagList from './posts/tagList';
import { useState } from 'react';

async function getPost(id) {
    var data = {title: 'hi'};
    await axios
    .get('/api/posts/' + id)
    .then((res) => data = res.data)
    .catch((err) => console.log(err));

    return data;
}

async function getColours(tags) {
    console.log(tags);
    var colours = {"main": "#EEE", "contrast": "#000"};
    if(tags.length > 0) {
        await axios
        .get('/api/tags/'+tags[0])
        .then((res) => {
            colours["main"] = res.data["colour"];
            colours["contrast"] = res.data["contrast_colour"];
            console.log(colours);
        })
        .catch((err) => console.log(err));
    }
    console.log(colours);
    return colours;
}

export async function loader({ params }) {
    const data = await getPost(params.postId);
    const colours = await getColours(data["tags"]);
    return {data, colours};
}

export default function PostPage() {
    const {data, colours} = useLoaderData();
    
      return (
        <div className="window" id={data.id.toString()}>
            <a href={"#" + data.id.toString()} className="window-topbar">
                bookmark/{data.title}
            </a>
            <div className="window-content">
                <div className="bookmark-banner" style={{"--main_colour":colours["main"], "--contrast_colour": colours["contrast"]}}>
                     <PostLink link={data["link"]} />
                    <a className="featured-link" href={data["link"]} target='blank'><h1>{data.page_title}</h1></a>
                    <div className='bookmark-banner--flex'>
                        <div className="bookmark-preview">
                            <img src={data["image"]}></img>
                            <p>{data.page_desc}</p>
                        </div>
                        <div className="bookmark-comment">
                            <p className="post_date">{format(data["date"], "d/M/y")}</p>
                            <p><b>{data.title}</b> {data.desc}</p>
                            {data["tags"].length > 0 &&  <TagList tags_id={data["tags"]} /> }
                        </div>
                    </div>
                </div>
            </div>
    </div>
  );
}

