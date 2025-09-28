import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constansts";
import FeedCard from "./FeedCard";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../store/feedSlice";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);
  const getFeed = async () => {
    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res.data.feed));
    } catch (err) {
      console.log(err.message);
    }
  };
  useEffect(() => {
    getFeed();
  }, []);
  return (
    <>
      {feed &&
        (feed.length === 0 ? (
          <span className="text-white font-bold flex mt-[20%] my-auto justify-center">
            No users found
          </span>
        ) : (
          <div>
            <FeedCard user={feed[0]} />
          </div>
        ))}
    </>
  );
};

export default Feed;
