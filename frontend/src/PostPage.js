import './App.css';
import axios from "axios";
import { BrowserRouter, Routes, Route, useLoaderData } from "react-router-dom";
import PostLink from './posts/postLink';
import { format } from "date-fns";
import TagList from './posts/tagList';

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

const scrollToPage = (id) => {
    const windowContainer = document.getElementById("window");
    const page = document.getElementById(id);
    if(windowContainer && page) {
        windowContainer.scrollTo(page.offsetLeft, 0); 
        console.log("scrolled to " + id);
    } else {
        console.log("failed scrolling to " + id);
    }
}

export default function PostPage() {
    const {data} = useLoaderData();
    
      return (
        <div className="window" id={data.id.toString()}>
            <a href={"#" + data.id.toString()} className="window-topbar">
                bookmark/{data.title}
            </a>
            <div className="window-content">
                <div className="bookmark-banner"
                style={ data["tags"].length > 0 ? {"--main_colour":data['tags'][0]["colour"], "--contrast_colour": data['tags'][0]["contrast_colour"]} : {"--main_colour": "#EEE", "--contrast_colour": "#000"}}>
                     <PostLink link={data["link"]} />
                    <a className="featured-link" href={data["link"]} target='blank'><h1>{data.page_title}</h1></a>
                    <div className='bookmark-banner--flex'>
                        <div className="bookmark-preview">
                            {data["image"] != null && <img src={data["image"]}></img> }
                            <p>{data.page_desc}</p>
                        </div>
                        <div className="bookmark-comment">
                            <p className="post_date">{format(data["date"], "d/M/y")}</p>
                            <p><b>{data.title}</b> {data.desc}</p>
                            {data["tags"].length > 0 &&  <TagList tags={data["tags"]} /> }
                        </div>
                    </div>
                </div>
            </div>
            {scrollToPage(data.id.toString())}
        </div>
  );
}

