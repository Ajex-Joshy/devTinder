import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constansts";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../store/connectionsSlice";
import UsersCard from "./UsersCard";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);
  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res.data.data));
    } catch (err) {
      console.log(err.message);
    }
  };
  useEffect(() => {
    fetchConnections();
  }, []);
  return (
    <div>
      <h1 className="text-2xl text-white text-center m-4 pb-4 font-bold">
        Connections
      </h1>
      {connections && (
        <div>
          {connections.map((c) => (
            <UsersCard key={c._id} user={c} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Connections;
