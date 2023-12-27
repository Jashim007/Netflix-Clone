import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { NavLink } from "react-router-dom";

const Categories = () => {
  const [movieCat, setMovieCat] = useState([]);
  const [seriesCat, setSeriesCat] = useState([]);
  let contentTypeMovies = "movie";
  let contentTypeSeries = "tv";

  useEffect(() => {
    const getCategoryData = async () => {
      try {
        const URL1 = `https://api.themoviedb.org/3/genre/movie/list?api_key=716a23024113aad0cd75c8523bc1dea2&language=en-US`;
        const URL2 = `https://api.themoviedb.org/3/genre/tv/list?api_key=716a23024113aad0cd75c8523bc1dea2&language=en-US`;
        const movieResults = await fetch(URL1);
        const seriesResults = await fetch(URL2);
        const movieData = await movieResults.json();
        const seriesData = await seriesResults.json();
        setMovieCat(movieData);
        setSeriesCat(seriesData);
      } catch (error) {
        console.log(error);
      }
    };
    getCategoryData();
  }, []);
  console.log(movieCat);
  console.log(seriesCat);
  return (
    <div className="bg-black w-screen h-screen text-white">
      <Navbar />
      <div className="content pt-20  bg-black">
        <div className="font-bold text-2xl pl-5">Movie Categories</div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 grid-auto-rows  gap-4  w-screen p-5">
          {movieCat.length === 0 ? (
            <></>
          ) : (
            <>
              {movieCat.genres.map((e) => {
                return (
                  <NavLink
                    to={`/categoryList/:${contentTypeMovies}/:${e.id}`}
                    className="p-5 text-white bg-gray-600 shadow-md rounded-md flex items-center justify-center
                  hover:scale-105">
                    {e.name}
                  </NavLink>
                );
              })}
            </>
          )}
        </div>

        <div className="font-bold text-2xl pl-5">Series Categories</div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 grid-auto-rows  gap-4  w-screen p-5">
          {seriesCat.length === 0 ? (
            <></>
          ) : (
            <>
              {seriesCat.genres.map((e) => {
                return (
                  <NavLink
                    to={`/categoryList/:${contentTypeSeries}/:${e.id}`}
                    className="p-5 text-white bg-gray-600 shadow-md rounded-md flex items-center justify-center
                  hover:scale-105">
                    {e.name}
                  </NavLink>
                );
              })}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Categories;
