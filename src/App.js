import React, { useEffect } from "react";
import Homescreen from "./Homescreen";
import Login from "./Login";
import SingleMovie from "./SingleMovie";
import MovieSearch from "./MovieSearch";
import Categories from "./Categories";
import CategoryList from "./CategoryList";
import SingleSeries from "./SingleSeries";
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
  console.log(dispatch);
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
        {user?.user === undefined || user?.user?.length === 0 ? (
          <Login />
        ) : (
          <Routes>
            <Route path="/" element={<Homescreen />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/movie/:id" element={<SingleMovie />}></Route>
            <Route path="/tv/:id" element={<SingleSeries />}></Route>
            <Route path="/movieSearch" element={<MovieSearch />}></Route>
            <Route path="/categories" element={<Categories />}></Route>
            <Route
              path="/categoryList/:contentType/:id"
              element={<CategoryList />}
            ></Route>
          </Routes>
        )}
      </BrowserRouter>
    </div>
  );
};

export default App;
