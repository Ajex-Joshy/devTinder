import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constansts";
import { useDispatch, useSelector } from "react-redux";
import { addRequests } from "../store/requestsSlice";
import UsersCard from "./UsersCard";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/connection/pending", {
        withCredentials: true,
      });
      dispatch(addRequests(res.data.pending));
    } catch (err) {
      console.log(err.message);
    }
  };
  useEffect(() => {
    fetchRequests();
  }, []);
  return (
    <div>
      <h1 className="text-2xl text-white text-center m-4 pb-4 font-bold">
        Requests
      </h1>
      {requests &&
        (requests.length === 0 ? (
          <span className="text-white font-bold flex mt-[20%] my-auto justify-center">
            No pending requests
          </span>
        ) : (
          <div>
            {requests.map((c) => (
              <UsersCard key={c._id} user={c.fromUserId} request={true} />
            ))}
          </div>
        ))}
    </div>
  );
};

export default Requests;
