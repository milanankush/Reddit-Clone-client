import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Post from "./Post";

function SearchResultsPage(props) {
  const { text } = props.match.params;
  const [comments, setComments] = useState([]);
  const [communities, setCommunities] = useState([]);
  useEffect(() => {
    axios
      .get("/search?phrase=" + text, { withCredentials: true })
      .then((response) => {
        setComments(response.data.comments);
        setCommunities(response.data.communities);
      });
  }, []);

  return (
    <div className="bg-reddit_dark">
      {communities.map((community) => (
        <Link
          className="block bg-reddit_dark-brighter p-3 mx-6 border-2 border-reddit_border text-reddit_text rounded mb-2 border hover:border-reddit_text"
          to={"/r/" + community.name}
        >
          r/{community.name}
        </Link>
      ))}
      {comments.map((comment) => (
        <Post {...comment} isListing={true} />
      ))}
    </div>
  );
}
export default SearchResultsPage;
