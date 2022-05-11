import axios from "axios";
import { useEffect, useState } from "react";
import ClickOutHandler from "react-clickout-handler";
import Comment from "./Comment";

function CommentModal(props) {
  const [comment, setComment] = useState({});
  const visibleClass = props.open ? "block" : "hidden";

  useEffect(() => {
    axios.get("/comments/" + props.id).then((response) => {
      setComment(response.data);
    });
  }, [props.id]);

  function close() {
    setComment({});
    props.onClickOut();
  }
  return (
    <div
      className={
        "w-screen h-screen fixed top-0 left-0 z-20 flex " + visibleClass
      }
      style={{ backgroundColor: "rgba(0, 0, 0, .8)" }}
    >
      <div className="block overflow-scroll w-screen">
        <ClickOutHandler onClickOut={() => close()}>
          <div className="w-3/4 my-4 lg:w-1/2 border border-reddit_dark-brightest p-4 bg-reddit_dark-brighter text-reddit_text self-center mx-auto rounded-md">
            <div className="">
              <Comment comment={comment} id={props.id} />
            </div>
          </div>
        </ClickOutHandler>
      </div>
    </div>
  );
}

export default CommentModal;
