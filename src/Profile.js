import React from "react";
import Navbar from "./Navbar";
import { logout } from "./features/userSlice";
import { useDispatch } from "react-redux";
const Profile = () => {
  const dispatch = useDispatch();
  return (
    <div className="h-screen w-screen bg-black ">
      <Navbar />
      <div className="profile_screen h-1/2 w-1/2 pt-28 mx-auto bg-black">
        <div className="text-4xl font-bold text-white">Edit Profile</div>
        <div className="flex gap-3">
          <img
            src="https://ih1.redbubble.net/image.618427277.3222/flat,800x800,075,f.u2.jpg"
            alt="Netflix user"
            className="h-20 mr-8 mt-8 rounded-sm"
          />
          <div className="form flex flex-col mt-8 gap-5 w-full">
            <div className="emailid h-8 bg-slate-600 text-white px-3 flex items-center justify-start rounded-sm">
              Jashim@gmail.com
            </div>
            <div className="emailid h-8 text-white">
              Plans (Current Plan: Premium)
            </div>
            <div className="emailid h-8 text-white text-sm">
              Renewal Date: 04/03/2021
            </div>
            <div className="emailid h-8 text-white text-sm">
              <div className="flex justify-between">
                <div className="flex flex-col">
                  <div>Netflix Basic</div>
                  <div>480p</div>
                </div>
                <div>
                  <button className="p-2 w-full bg-red-600 active:scale-95">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
            <div className="emailid h-8 text-white text-sm">
              <div className="flex justify-between">
                <div className="flex flex-col">
                  <div>Netflix Standard</div>
                  <div>1080p</div>
                </div>
                <div>
                  <button className="p-2 w-full bg-red-600 active:scale-95">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
            <div className="emailid h-8 text-white text-sm">
              <div className="flex justify-between">
                <div className="flex flex-col">
                  <div>Netflix Premium</div>
                  <div>4k</div>
                </div>
                <div>
                  <button className="p-2 w-full bg-red-600 active:scale-95">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
            <div>
              <button
                className="p-2 w-full bg-red-600 text-white active:scale-95"
                onClick={() => {
                  dispatch(logout());
                }}
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
