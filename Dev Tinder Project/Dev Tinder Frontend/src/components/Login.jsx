import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { BASE_URL } from "../utils/constansts";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../store/userSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const email = useRef();
  const password = useRef();
  const firstName = useRef();
  const lastName = useRef();
  const age = useRef();
  const gender = useRef();
  const phoneNo = useRef();
  const confirmPassword = useRef();
  const about = useRef();
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const handleSubmit = async () => {
    try {
      const payload = isLogin
        ? {
            emailId: email.current.value,
            password: password.current.value,
          }
        : {
            firstName: firstName.current.value,
            lastName: lastName.current.value,
            age: age.current.value,
            gender: gender.current.value,
            phoneNo: phoneNo.current.value,
            emailId: email.current.value,
            password: password.current.value,
            confirmPassword: confirmPassword.current.value,
            about: about.current.value,
          };

      const url = isLogin ? "/login" : "/signup";

      const res = await axios.post(BASE_URL + url, payload, {
        withCredentials: true,
      });
      dispatch(addUser(res.data.user));
    } catch (err) {
      if (err.response) {
        setError(err.response.data);
      } else console.log("Error:", err);
    }
  };
  useEffect(() => {
    if (user) navigate("/feed");
  }, [user]);
  return (
    <div className="flex items-center justify-center p-5 mt-[10%] md:mt-[5%]">
      <div className="w-full max-w-md bg-gray-900 rounded-xl shadow-lg p-8 border border-gray-700">
        <h1 className="text-3xl font-extrabold text-center bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent mb-6">
          {isLogin ? "Login" : "Register"}
        </h1>
        <form
          className="flex flex-col space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          {!isLogin && (
            <>
              <input
                className="w-full rounded-lg border border-gray-600 bg-gray-800/70 px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                type="text"
                id="firstName"
                placeholder="First Name"
                required
                ref={firstName}
              />
              <input
                className="w-full rounded-lg border border-gray-600 bg-gray-800/70 px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                type="text"
                id="lastName"
                placeholder="Last Name"
                required
                ref={lastName}
              />
              <input
                className="w-full rounded-lg border border-gray-600 bg-gray-800/70 px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                type="number"
                id="age"
                placeholder="Age"
                required
                ref={age}
              />
              <select
                id="gender"
                className="w-full rounded-lg border border-gray-600 bg-gray-800/70 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                required
                ref={gender}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              <input
                className="w-full rounded-lg border border-gray-600 bg-gray-800/70 px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                type="tel"
                id="phoneNo"
                placeholder="Phone Number"
                required
                ref={phoneNo}
              />
              <input
                className="w-full rounded-lg border border-gray-600 bg-gray-800/70 px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
                type="email"
                id="email"
                placeholder="Email Address"
                ref={email}
                required
              />
              <textarea
                id="about"
                placeholder="About you..."
                className="w-full rounded-lg border border-gray-600 bg-gray-800/70 px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                rows="3"
                required
                ref={about}
              ></textarea>
              <input
                className="w-full rounded-lg border border-gray-600 bg-gray-800/70 px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
                type="password"
                id="password"
                placeholder="Password"
                ref={password}
                required
              />
              <input
                className="w-full rounded-lg border border-gray-600 bg-gray-800/70 px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                type="password"
                id="confirmPassword"
                placeholder="Confirm Password"
                required
                ref={confirmPassword}
              />
            </>
          )}
          {isLogin && (
            <>
              <input
                className="w-full rounded-lg border border-gray-600 bg-gray-800/70 px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
                type="email"
                id="email"
                placeholder="Email Address"
                ref={email}
                required
              />
              <input
                className="w-full rounded-lg border border-gray-600 bg-gray-800/70 px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
                type="password"
                id="password"
                placeholder="Password"
                ref={password}
                required
              />
            </>
          )}
          {error && (
            <p className="text-sm text-red-200 bg-red-600/30 border border-red-500 rounded-md px-3 py-2 text-center">
              {error}
            </p>
          )}
          <button
            type="submit"
            className="w-full rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 py-2 font-semibold text-white shadow-md hover:from-purple-500 hover:to-pink-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition"
          >
            {isLogin ? "Login" : "Register"}
          </button>
          <p className="text-center text-gray-400 text-sm mt-3">
            {isLogin ? (
              <>
                New to DevTinder?{" "}
                <span
                  className="text-blue-400 cursor-pointer hover:underline"
                  onClick={() => setIsLogin(false)}
                >
                  Register
                </span>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <span
                  className="text-blue-400 cursor-pointer hover:underline"
                  onClick={() => setIsLogin(true)}
                >
                  Login
                </span>
              </>
            )}
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;

//  from-gray-900 via-gray-800 to-black px-4
