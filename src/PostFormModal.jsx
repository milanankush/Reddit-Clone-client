import { useState, useContext } from "react";
import ClickOutHandler from "react-clickout-handler";
import Button from "./Button";
import Input from "./Input";
import PostFormModalContext from "./PostFormModalContext";
import Textarea from "./Textarea";
import axios from "axios";
import AuthModalContext from "./AuthModalContext";
import { Redirect } from "react-router-dom";
import { CommunityContext } from "./CommunityContext";

function PostFormModal() {
  const modalContext = useContext(PostFormModalContext);
  const authModalContext = useContext(AuthModalContext);
  const { community } = useContext(CommunityContext);
  const visibleClass = modalContext.show ? "block" : "hidden";
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [newPostId, setNewPostId] = useState(null);
  function createPost() {
    const data = { title, body, community };
    axios
      .post("/comments", data, { withCredentials: true })
      .then((response) => {
        setNewPostId(response.data._id);
      })
      .catch((error) => {
        if (error.response.status === 401) {
          authModalContext.setShow("login");
        }
      });
  }

  if (newPostId) {
    return <Redirect to={"/comments/" + newPostId} />;
  }

  return (
    <div
      className={
        "w-screen h-screen fixed top-0 left-0 z-20 flex " + visibleClass
      }
      style={{ backgroundColor: "rgba(0, 0, 0, .8)" }}
    >
      <ClickOutHandler onClickOut={() => {} /*modalContext.setShow(false)*/}>
        <div className="w-3/4 md:w-2/4 border border-reddit_dark-brightest bg-reddit_dark p-5 text-reddit_text self-center mx-auto rounded-md">
          <h1 className="text-2xl mb-5">Create a Post</h1>
          <Input
            className="w-full mb-2"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Textarea
            className="w-full mb-3"
            placeholder="Post text (you can use markdown)"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
          <div className="text-right">
            <Button
              onClick={() => modalContext.setShow(false)}
              outline
              className="px-4 py-2 mr-3"
            >
              Cancel
            </Button>
            <Button onClick={() => createPost()} className="px-4 py-2">
              POST
            </Button>
          </div>
        </div>
      </ClickOutHandler>
    </div>
  );
}

export default PostFormModal;
