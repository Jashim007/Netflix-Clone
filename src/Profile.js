import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Userplan from "./Userplan";
import { logout } from "./features/userSlice";
import { useDispatch } from "react-redux";
import { currentUser } from "./features/userSlice";
import { useSelector } from "react-redux";
import { signOut } from "firebase/auth";
import { auth } from "./firebase-config";
/* ----------------------------------------------------------- */

import { collection, getDocs, addDoc } from "firebase/firestore";
import db from "./firebase-config";

/* ----------------------------------------------------------- */

const Profile = () => {
  const dispatch = useDispatch();
  const user = useSelector(currentUser);

  const [userData, setUserData] = useState([]);

  /* ---------Getting Data from database------------------- */

  const studentDatabaseRef = collection(db, "Netflix_Users");

  const loggingOut = async (e) => {
    try {
      const res = await signOut(auth);
      console.log(res);

      dispatch(logout());
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    const getUsers = async () => {
      const studentData = await getDocs(studentDatabaseRef);
      let d = studentData.docs.map((item) => {
        return { ...item.data(), id: item.id };
      });
      setUserData(d);
    };
    getUsers();
  }, [studentDatabaseRef]);

  /* ---------Getting Data from database------------------- */
  let filteredData = [];
  let userPlan = "";

  if (
    userData.length > 0 &&
    user?.user !== undefined &&
    user?.user?.length !== 0
  ) {
    filteredData = userData.filter((e) => e.Email === user.user.email);
  }

  if (
    userData.length > 0 &&
    user?.user !== undefined &&
    user?.user?.length !== 0
  ) {
    if (filteredData.length > 0) {
      userPlan = filteredData[0].Plan;
    } else {
      userPlan = "Netflix Basic";
      const addUser = async () => {
        await addDoc(studentDatabaseRef, {
          Email: user?.user?.email,
          Plan: "Netflix Basic",
        });
      };
      addUser();
    }
  }

  return (
    <>
      {userPlan.length > 0 ? (
        <>
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
                    {user?.user?.email}
                  </div>
                  <div className="emailid h-8 text-white">
                    Plans (Current Plan: {userPlan})
                  </div>
                  <div className="emailid h-8 text-white text-sm">
                    Renewal Date: 04/03/2021
                  </div>
                  <Userplan
                    planName="Netflix Basic"
                    quality="480p"
                    currentPlan={userPlan}
                    email={user?.user?.email}
                    userId={filteredData[0].id}
                  />
                  <Userplan
                    planName="Netflix Standard"
                    quality="1080p"
                    currentPlan={userPlan}
                    email={user?.user?.email}
                    userId={filteredData[0].id}
                  />
                  <Userplan
                    planName="Netflix Premium"
                    quality="4k"
                    currentPlan={userPlan}
                    email={user?.user?.email}
                    userId={filteredData[0].id}
                  />
                  <div>
                    <button
                      className="p-2 w-full bg-red-600 text-white active:scale-95"
                      onClick={() => {
                        loggingOut();
                      }}
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
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
                    {user?.user?.email}
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
                        loggingOut();
                      }}
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Profile;
