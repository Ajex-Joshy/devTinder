import React from "react";
import { BASE_URL, DEFAULT_USER_IMG } from "../utils/constansts";
import axios from "axios";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../store/feedSlice";

const FeedCard = ({
  user: { _id, firstName, lastName, about, photoUrl, age, gender },
}) => {
  const dispatch = useDispatch();
  const handleSendRequest = async (status, id) => {
    try {
      await axios.post(
        BASE_URL + `/request/send/${status}/${id}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(id));
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="card bg-gray-700 w-70 shadow-sm mx-auto m-4 rounded-lg">
      <figure>
        <img
          className="rounded-full w-32 h-32 object-cover m-4"
          src={photoUrl}
          alt="user"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        <p>
          {age} , {gender}
        </p>
        <p className="mt-3">{about}</p>
        <div className="card-actions mx-auto mt-3">
          <button
            className="btn bg-green-500 text-white rounded-lg"
            onClick={() => handleSendRequest("interested", _id)}
          >
            Interested
          </button>
          <button
            className="btn bg-red-400 text-white rounded-lg"
            onClick={() => handleSendRequest("ignored", _id)}
          >
            Ignore
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedCard;
