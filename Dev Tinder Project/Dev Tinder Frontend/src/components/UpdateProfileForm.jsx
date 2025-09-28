import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FeedCard from "./FeedCard";
import axios from "axios";
import { BASE_URL } from "../utils/constansts";
import { addUser } from "../store/userSlice";

const UpdateProfileForm = ({ setIsUpdate }) => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    firstName: user.firstName || "",
    lastName: user.lastName || "",
    age: user.age || "",
    phoneNo: user.phoneNo || "",
    about: user.about || "",
    photoUrl: user.photoUrl || "",
    gender: user.gender,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        { formData },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.data));
      setIsUpdate(false);
    } catch (err) {
      setError(err.response.data.error);
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  return (
    <div className="flex justify-center">
      <div className="hidden md:flex m-10  items-center">
        <FeedCard user={formData} />
      </div>
      <div className="m-10">
        <div className="md:hidden">
          <img className="w-30 mx-auto m-4" src={user.photoUrl} alt="" />
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-3 w-80 mx-auto mt-5"
        >
          <label className="text-white font-bold" htmlFor="firstName">
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            placeholder="First Name"
            className="border p-2 rounded"
            onChange={handleChange}
            defaultValue={user.firstName}
          />
          <label className="text-white font-bold" htmlFor="lastName">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            placeholder="Last Name"
            className="border p-2 rounded"
            value={formData.lastName}
            onChange={handleChange}
          />
          <label className="text-white font-bold" htmlFor="age">
            Age
          </label>
          <input
            type="number"
            id="age"
            placeholder="Age"
            className="border p-2 rounded"
            value={formData.age}
            onChange={handleChange}
          />
          <label className="text-white font-bold" htmlFor="phoneNo">
            Phone Number
          </label>
          <input
            type="text"
            id="phoneNo"
            placeholder="Phone Number"
            className="border p-2 rounded"
            value={formData.phoneNo}
            onChange={handleChange}
          />
          <label className="text-white font-bold" htmlFor="phoneNo">
            Photo Url
          </label>
          <input
            type="text"
            id="photoUrl"
            placeholder="Photo Url"
            className="border p-2 rounded"
            value={formData.photoUrl}
            onChange={handleChange}
          />
          <label className="text-white font-bold" htmlFor="about">
            About
          </label>
          <textarea
            id="about"
            placeholder="About"
            className="border p-2 rounded"
            value={formData.about}
            onChange={handleChange}
            rows={4}
          ></textarea>
          <p className="text-red-400 text-center font-bold">{error}</p>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 rounded mt-2 cursor-pointer"
          >
            Save My Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfileForm;
