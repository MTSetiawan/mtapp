/* eslint-disable react/prop-types */
const CardPosts = ({ api }) => {
  return (
    <div>
      {api.map((data) => {
        return (
          <div
            className="card bg-gray-100 w-full shadow-xl mt-3 text-black"
            key={data.id}
          >
            <div className="card-body">
              <h2 className="card-title">{data.username}</h2>
              <p>{data.content}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CardPosts;
