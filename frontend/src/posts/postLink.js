import { useState } from 'react';
import axios from "axios";
import { format } from "date-fns";

function scrollToPage(id) {
    setTimeout(
        function(){
            document.getElementById("window").scrollTo(document.getElementById(id).offsetLeft, 0)
        }, 10);
}

export default function PostLink({link, id}) {

    return (
        <a className="post_link" href={link} target='blank'>{link.replace("https://www.", "").replace("http://www.", "").replace("https://", "").replace("http://", "")}</a>
    );
}