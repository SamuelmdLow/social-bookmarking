import Post from "./post";

function groupPosts(posts, num=4) {
    var group = [];
    var i =0;
    while (i*num + num < posts.length) {
      group.push(posts.slice(i*num, i*num+num));
      i = i + 1;
    }
    group.push(posts.slice(i*num));
    console.log(group);
    return group;
}

function groupPostsByDate(total, value, index) {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const second = 1000
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const today = new Date();
    const date = new Date(value["date"]);
    if(index === 0 ) {
      total = [];
    }

    const delta = new Date(today.getTime()-date.getTime());

    var year = "";
    if(today.getFullYear() != date.getFullYear()) {
      year = " " + String(date.getFullYear());
    }

    var header = "";
    if(index != 0) {
      header = total[total.length-1]['header'];
    }

    if(Math.abs(delta/day) < 1 && header != "Today") {
      header = "Today";
      total.push({"header": header, "posts": []});
    } else if(Math.abs(delta/day) < 7 && header != "This Week") {
      header = "This Week";
      total.push({"header": header, "posts": []});
    } else if (date.getMonth() == today.getMonth() && year == "" && header != "This Month") {
      header = "This Month";
      total.push({"header": header, "posts": []});
    } else if (Math.abs(delta/day) >= 7 && header != months[date.getMonth()] + year) {
      header = months[date.getMonth()] + year;
      total.push({"header": months[date.getMonth()] + year, "posts": []});
    }

    total[total.length-1]["posts"].push(value);
    return total;
}

var lastHeader = "";

function isNewHeader(nextHeader) {
  if (lastHeader == nextHeader) {
    return false;
  } else {
    lastHeader = nextHeader;
    return true;
  }
}

export default function FeedGroup({posts, all_tags, set_tags}) {
    
    return (
      <>
        {groupPosts(posts).map(postGroup =>
            <div className="feed-flex">
                <div className="left">
                {postGroup.reduce(groupPostsByDate, []).map(postGroupedByDate =>
                  <>
                        {isNewHeader(postGroupedByDate["header"]) && <h2 id={postGroupedByDate["header"].replace(" ", "_")}>{postGroupedByDate["header"]}</h2>}
                        <ul className="post-list">{postGroupedByDate["posts"].map(post =>
                          <li key={post["id"].toString()}><Post data={post} all_tags={all_tags} set_tags={set_tags} /></li>
                        )}</ul>
                  </>
                  
                )}
                </div>
                <div className="right"></div>
            </div>
        )}
      </>
    );
}