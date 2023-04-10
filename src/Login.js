import React, { useState } from "react";
import Signin from "./Signin";

const Login = () => {
  const [signin, setSignin] = useState(false);
  return (
    <>
      {signin === true ? (
        <Signin />
      ) : (
        <div
          className="bg-cover bg-center h-screen w-screen z-10 "
          style={{
            backgroundImage: `url(https://img.helpnetsecurity.com/wp-content/uploads/2020/03/23143409/netflix-collection.jpg)`,
          }}
        >
          <div className="bg-gradient-to-b from-black  via-black/30 to-black h-full w-full">
            <div className="h-2/6 ">
              <div className="flex justify-between items-center h-14">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png"
                  alt="Netflix Logo"
                  className="h-6 ml-9"
                />
                <button
                  className="h-8 mr-8 rounded-sm bg-red-600 text-white p-2 flex items-center justify-center active:scale-95 transition-all duration-200"
                  onClick={() => {
                    setSignin(true);
                  }}
                >
                  Sign In
                </button>
              </div>
            </div>
            <div className="h-2/6 px-20">
              <div className="flex flex-col items-center justify-center text-white gap-4 max-w-full">
                <div className="text-4xl font-bold ">
                  Unlimited films,TV programmes and more.
                </div>
                <div className="text-xl font-semibold">
                  Watch anywhere. Cancel at any time.
                </div>
                <div>
                  Ready to watch? Enter your email to register or restart your
                  membership
                </div>
                <div className="flex items-center justify-center h-20 max-w-[1200px]">
                  <input
                    type="text"
                    placeholder="Enter email"
                    className="h-1/2 rounded-sm p-2 w-full focus:outline-none text-slate-600"
                  />
                  <button
                    className="h-1/2 rounded-sm p-2 w-1/2 bg-red-600 flex items-center justify-center active:scale-95  transition-all duration-200"
                    onClick={() => {
                      setSignin(true);
                    }}
                  >
                    Get Started
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
