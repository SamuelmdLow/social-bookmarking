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

async function getPosts(tagSlug) {
    var data = [];

    await axios
    .get('/api/posts/?search='+ tagSlug +'&ordering=-date&page=1')
    .then((res) => data = res.data.results)
    .catch((err) => console.log(err));
    return data;
}

async function getTag(tagSlug) {
    var data = [];
    await axios
    .get('/api/tags/?search=' + tagSlug)
    .then((res) => data = res.data.results)
    .catch((err) => console.log(err));

    if (data.length > 0) {
        return data[0];
    }
    return null;
}

export async function loader({ params }) {
    const tag = await getTag(params.tagSlug);
    const posts = await getPosts(params.tagSlug);
    return {tag,posts};
}

export default function TagPage() {
    const {tag,posts} = useLoaderData();
    
    return (
        <div className="window thin-window tag-page" id={tag.slug} style={{"--main_colour":tag["colour"], "--contrast_colour": tag["contrast_colour"]}}>
            <a href={'#' + tag.slug} className="window-topbar"></a>
          <div className="window-content">
    
          <div className="feed">
            <h1>{tag.name}</h1>
            <ul className="post-list">{Array.from(posts).map(post =>
                <li key={post["id"].toString()}><Post data={post} /></li>
            )}</ul>
          </div>
          </div>   
        </div>
      );
}

