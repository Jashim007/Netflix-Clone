import React, { useState } from "react";
import { auth } from "./firebase-config";

import { login } from "./features/userSlice";
import { useDispatch } from "react-redux";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const Signin = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const register = async (e) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      console.log(res);
      dispatch(
        login({
          uid: res.user.uid,
          email: res.user.email,
        })
      );
    } catch (error) {
      alert(error.message);
    }
  };
  const loggingIn = async (e) => {
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      console.log(res);

      dispatch(
        login({
          uid: res.user.uid,
          email: res.user.email,
        })
      );
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div
      className="bg-cover bg-center h-screen w-screen "
      style={{
        backgroundImage: `url(https://img.helpnetsecurity.com/wp-content/uploads/2020/03/23143409/netflix-collection.jpg)`,
      }}
    >
      <div className="bg-gradient-to-b from-black  via-black/30 to-black h-full w-full">
        <div className="h-1/6 ">
          <div className="flex justify-between items-center h-14">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png"
              alt="Netflix Logo"
              className="h-6 ml-9"
            />
          </div>
        </div>
        <div className="h-4/6 px-20 flex items-center justify-center rounded-sm">
          <div className=" bg-black h-full w-1/3 rounded-sm p-10 flex flex-col items-start gap-5">
            <div className="text-white text-2xl font-bold">Sign In</div>
            <input
              type="text"
              placeholder="Enter email"
              className="h-10 rounded-sm p-2 w-full focus:outline-none text-slate-600"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <input
              type="text"
              placeholder="Enter password"
              className="h-10 rounded-sm p-2 w-full focus:outline-none text-slate-600"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <button
              className="h-12 w-full p-2 bg-red-600 rounded-sm mt-3 text-white active:scale-95"
              onClick={loggingIn}
            >
              Sign In
            </button>
            <div className="text-slate-200 text-md  flex gap-2">
              <span>New to Netflix?</span>
              <span
                className="hover:underline hover:cursor-pointer active:scale-95"
                onClick={register}
              >
                Sign up now
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
