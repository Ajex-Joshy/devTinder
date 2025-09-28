import React, { useState } from "react";
import Feed from "./Feed";
import { useSelector } from "react-redux";
import FeedCard from "./FeedCard";
import UpdateProfileForm from "./UpdateProfileForm";

const Profile = () => {
  const user = useSelector((store) => store.user);
  const [isUpdate, setIsUpdate] = useState(false);
  return (
    user && (
      <>
        {!isUpdate && (
          <>
            <div>
              <FeedCard user={user} />
            </div>
            <div className="flex justify-center">
              <button
                className="bg-blue-500 text-white py-2 rounded mt-2 px-3 cursor-pointer"
                onClick={() => setIsUpdate(!isUpdate)}
              >
                Update My Profile
              </button>
            </div>
          </>
        )}
        {isUpdate && <UpdateProfileForm setIsUpdate={setIsUpdate} />}
      </>
    )
  );
};

export default Profile;
