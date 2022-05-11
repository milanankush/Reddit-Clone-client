import Comment from "./Comment";

function CommentPage(props) {
  const commentId = props.match.params.id;
  return (
    <div className="bg-reddit_dark py-4 px-6">
      <div className="bg-reddit_dark-brighter p-3 rounded-md">
      <Comment id={commentId} />
      </div>
      
    </div>
  );
}

export default CommentPage;
