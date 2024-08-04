import { Link } from "react-router-dom";

export default function TagList({tags}) {
    return ( 
        <ul className="tag-list">{tags.map(tag =>
            <li key={tag.id} style={{"--main_colour": tag.colour, "--contrast_colour": tag.contrast_colour}}>
                <Link to={"/tag/" + tag.slug}>{tag.name}</Link>
            </li>
        )}</ul>);
}