import React from "react";
import { BASE_URL, DEFAULT_USER_IMG } from "../utils/constansts";
import axios from "axios";
import { useDispatch } from "react-redux";
import { removeRequests } from "../store/requestsSlice";

const UsersCard = ({
  user: { _id, firstName, lastName, age, gender, about, photoUrl },
  request,
}) => {
  const dispatch = useDispatch();
  const handleRequest = async (status, id) => {
    try {
      const res = await axios.post(
        BASE_URL + `/request/review/${status}/${id}`,
        {},
        { withCredentials: true }
      );

      dispatch(removeRequests(id));
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <div className=" w-10/12 md:w-8/12 lg:w-6/12 mx-auto bg-blue-500  p-4 m-4 rounded-lg">
      <div className="flex flex-row justify-between">
        <div className="text-white text-sm md:text-lg">
          <h1 className="font-bold">{firstName + " " + lastName}</h1>
          <p>{age + ", " + gender}</p>
          <p>{about}</p>
        </div>
        <div className="">
          <img className="w-20 rounded-full" src={photoUrl} alt="" />
        </div>
      </div>
      {request && (
        <div>
          <button
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded-md mr-2 transition duration-200 mt-2"
            onClick={() => {
              handleRequest("accepted", _id);
            }}
          >
            Accept
          </button>
          <button
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-md transition duration-200 mt-2"
            onClick={() => {
              handleRequest("rejected", _id);
            }}
          >
            Reject
          </button>
        </div>
      )}
    </div>
  );
};

export default UsersCard;
