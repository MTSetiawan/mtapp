/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";

const CardPosts = ({ api, useGrid }) => {
  const getRelativeTime = (dateString) => {
    return formatDistanceToNow(new Date(dateString), { addSuffix: true });
  };
  return (
    <div
      className={
        useGrid
          ? "mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2"
          : ""
      }
    >
      {api.map((data) => {
        return (
          <div
            className="card bg-gray-100 w-full shadow-xl mt-3 text-black"
            key={data.id}
          >
            <div className="card-body">
              <Link to={`/profile/${data.user_id}`}>
                <h2 className="card-title">{data.username}</h2>
              </Link>
              <p>{data.content}</p>
              <p>{getRelativeTime(data.created_at)}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CardPosts;
