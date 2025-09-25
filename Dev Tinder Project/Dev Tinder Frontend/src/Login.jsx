import axios from "axios";
import React, { useRef, useState } from "react";
import { BASE_URL } from "./utils/constansts";
import { useDispatch } from "react-redux";
import { addUser } from "./store/userSlice";

const Login = () => {
  const email = useRef();
  const password = useRef();
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const handleSubmit = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId: email.current.value,
          password: password.current.value,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.user));
      console.log("res:", res.data.user);
    } catch (err) {
      if (err.response) {
        setError(err.response.data.msg);
      } else console.log("Error:", err.message);
    }
  };
  return (
    <div className="w-10/12 md:w-6/12 lg:w-3/12 mx-auto my-auto mt-[10vh] ">
      <h1 className="text-3xl text-white text-center font-bold">
        Welcome Back!
      </h1>
      <form
        action=""
        className="flex flex-col"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <p className="mx-auto p-1 text-red-400 font-semibold drop-shadow-md">
          {error}
        </p>
        <input
          className="border-3 border-white pt-1 text-white m-3 p-2 focus:outline-none"
          type="email"
          name=""
          id="email"
          placeholder="Email id"
          ref={email}
          required
          autoComplete="true"
        />
        <input
          className="border-3 border-white pt-1 text-white m-3 p-2 focus:outline-none"
          type="password"
          name=""
          id="password"
          placeholder="Password"
          ref={password}
          required
        />
        <input
          className="border-3 border-white pt-1 text-white m-3 p-2 focus:outline-none cursor-pointer"
          type="submit"
          name=""
          id="submit"
        />
      </form>
    </div>
  );
};

export default Login;
