import React, { useEffect } from "react";
import Homescreen from "./Homescreen";
import Login from "./Login";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase-config";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login, logout } from "./features/userSlice";
import { useSelector } from "react-redux";
import { currentUser } from "./features/userSlice";
import Profile from "./Profile";

const App = () => {
  const dispatch = useDispatch();

  const user = useSelector(currentUser);
  console.log(user);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user != null) {
        console.log(user);
        dispatch(
          login({
            uid: user.uid,
            email: user.email,
          })
        );
      } else {
        dispatch(
          logout({
            uid: user.uid,
            email: user.email,
          })
        );
      }
    });
    return unsubscribe;
  }, [dispatch]);
  return (
    <div>
      <BrowserRouter>
        {user.user == null ? (
          <Login />
        ) : (
          <Routes>
            <Route path="/" element={<Homescreen />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        )}
      </BrowserRouter>
    </div>
  );
};

export default App;
