import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { CommunityContext } from "./CommunityContext";
import Post from "./Post";

function PostListing() {
  const [comments, setComments] = useState([]);
  const { community } = useContext(CommunityContext);
  useEffect(() => {
    let url = "/comments";
    if (community) {
      url += "?community=" + community;
    }
    axios.get(url, { withCredentials: true }).then((response) => {
      setComments(response.data);
    });
  }, [community]);

  return (
    <div className="bg-reddit_dark">
      {comments.map((comment) => (
        <Post {...comment} isListing={true} />
      ))}
    </div>
  );
}

export default PostListing;
