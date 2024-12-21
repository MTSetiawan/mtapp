import { Link, useLoaderData, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import LikeButton from "../../components/Likes/ButtonLikes";
import { formatDistanceToNow } from "date-fns";
import Comments from "../../components/comments/Comments";

const DetailPost = () => {
  const { postId } = useParams();
  const data = useLoaderData();
  console.log("detail", data);

  const getRelativeTime = (dateString) => {
    const relativeTime = formatDistanceToNow(new Date(dateString), {
      addSuffix: true,
    });
    return relativeTime.replace("about ", "");
  };

  if (data.error) {
    console.error("Error from API:", data.error);
    return <div>Error: {data.error}</div>;
  }

  return (
    <div className="flex-grow p-4 min-h-screen bg-gray-200 ml-64">
      <Navbar user={data} />
      <h1>Detail Posts</h1>
      <div
        className="card bg-gray-100 w-full shadow-xl mt-3 text-black"
        key={data.id}
      >
        <div className="card-body">
          <Link to={`/profile/${data.user_id}`}>
            <h2 className="card-title">{data.username}</h2>
          </Link>
          <p>{data.content}</p>
          <LikeButton
            postId={data.id}
            initialLikes={data.likesCount}
            userLiked={data.userLiked}
          />
          <p>{getRelativeTime(data.created_at)}</p>
        </div>
      </div>
      <div className="card bg-gray-100 w-full shadow-xl mt-3 text-black">
        <Comments postId={postId} />
      </div>
    </div>
  );
};

export default DetailPost;
