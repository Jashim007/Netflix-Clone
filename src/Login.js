import React, { useState } from "react";
import Signin from "./Signin";

const Login = () => {
   
  const [signin, setSignin] = useState(false);
  return (
    <>
      {signin === true ? (
        <Signin/>
      ) : (
        <div
          className="bg-cover bg-center h-screen w-screen z-10 "
          style={{
            backgroundImage: `url(https://img.helpnetsecurity.com/wp-content/uploads/2020/03/23143409/netflix-collection.jpg)`,
          }}>
          <div className="bg-gradient-to-b from-black  via-black/30 to-black h-full w-full">
            <div className="h-1/6 md:h-2/6 ">
              <div className="flex justify-between items-center h-14">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png"
                  alt="Netflix Logo"
                  loading="lazy"
                  className="h-6 ml-9"
                />
                <button
                  className="h-8 mr-8 rounded-sm bg-red-600 text-white p-2 flex items-center justify-center active:scale-95 transition-all duration-200"
                  onClick={() => {
                    setSignin(true);
                  }}>
                  Sign In
                </button>
              </div>
            </div>
            <div className="h-3/6 md:h-2/6 px-20">
              <div className="flex flex-col items-center justify-center text-white md:gap-4 max-w-full space-y-3">
                <div className="text-4xl lg:text-5xl font-bold text-center">
                  Unlimited films,TV programmes and more.
                </div>
                <div className="text-xl md:text-2xl font-medium">
                  Watch anywhere. Cancel at any time.
                </div>
                <div className="text-lg md:text-xl ">
                  Ready to watch? Enter your email to register or restart your
                  membership
                </div>
                <div className="flex flex-col md:flex-row items-center justify-center  w-full gap-2">
                  <input
                    type="text"
                    placeholder="Email Address"
                    className="h-full rounded-md px-2 py-4 min-w-[300px] md:min-w-[400px] bg-transparent border border-red-500 focus:outline-none text-white"
                  />
                  <button
                    className="h-full rounded-md px-2 py-4  min-w-[200px] bg-red-600 flex items-center justify-center active:scale-95  transition-all duration-200 align-middle font-bold "
                    onClick={() => {
                      setSignin(true);
                    }}>
                    Get Started
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2.0}
                      stroke="currentColor"
                      className="w-6 h-6">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m8.25 4.5 7.5 7.5-7.5 7.5"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            <div className="h-2/6 "></div>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
