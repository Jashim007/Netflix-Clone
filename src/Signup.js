import React, { useState } from "react";
import { auth } from "./firebase-config";
import { login } from "./features/userSlice";
import { useDispatch } from "react-redux";
import { createUserWithEmailAndPassword } from "firebase/auth";

const Signup = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const register = async (e) => {
    try {
      let emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      setIsEmailValid(emailPattern.test(email));
      if (!isEmailValid) return;
      const res = await createUserWithEmailAndPassword(auth, email, password);
      console.log(res);
      dispatch(
        login({
          uid: res.user.uid,
          email: res.user.email,
        }),
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
      }}>
      <div className="bg-gradient-to-b from-black  via-black/40 to-black h-full w-full">
        <div className="h-1/6 ">
          <div className="flex justify-between items-center h-14">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png"
              alt="Netflix Logo"
              className="h-6 ml-9"
            />
          </div>
        </div>
        <div className="h-full md:h-96 md:px-20 flex items-center justify-center rounded-sm">
          <div className=" bg-black bg-opacity-0 md:bg-opacity-70 h-full w-96 rounded-sm p-10 flex flex-col items-start gap-5">
            <div className="text-white text-2xl font-bold">Sign Up</div>
            <input
              type="text"
              placeholder="Enter email"
              className="h-10 rounded-sm p-2 w-full focus:outline-none text-slate-600"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <div
              className={`h-3 text-sm text-red-600  ${
                isEmailValid ? "hidden" : "visible"
              }`}>
              *Please enter a valid email.
            </div>
            <div className="flex w-full relative">
              <input
                type={isPasswordVisible ? "text" : "password"}
                placeholder="Enter password"
                className="h-10 rounded-sm p-2 w-full focus:outline-none text-slate-600"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                id="password-field" // Add an ID for JavaScript targeting
              />
              <div
                onClick={togglePasswordVisibility}
                className="absolute top-3 right-2">
                {!isPasswordVisible ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                    />
                  </svg>
                )}
              </div>
            </div>

            <button
              className="h-12 w-full p-2 bg-red-600 rounded-sm mt-3 text-white active:scale-95"
              onClick={register}>
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
