import { useState } from 'react';
import axios from "axios";
import { format } from "date-fns";

export default function PostLink({link}) {

    return (
        <a className="post_link" href={link} target='blank'>{link.replace("https://www.", "").replace("http://www.", "").replace("https://", "").replace("http://", "")}</a>
    );
}