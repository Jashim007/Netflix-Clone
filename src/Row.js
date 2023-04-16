import React, { useState, useEffect } from "react";
import axios from "./axios";
import { NavLink } from "react-router-dom";

const Row = (props) => {
  const [movies, setMovies] = useState([]);

  const { title, fetchUrl } = props;

  useEffect(() => {
    const getMovieData = async () => {
      try {
        const results = await axios.get(fetchUrl);

        setMovies(results.data.results);

        return fetchUrl;
      } catch (error) {
        console.log(error);
      }
    };
    getMovieData();
  }, [fetchUrl]);

  return (
    <div className="bg-black pt-10">
      <div className="header text-lg text-white font-semibold pl-10">
        {title}
      </div>
      {props?.isLarge === "True" ? (
        <div className="flex gap-2 h-72 w-screen pt-5 pl-10 bg-black overflow-x-auto no-scrollbar">
          {movies.map((e) => {
            return (
              <NavLink to={`/movie/:${e.id}`} className="min-w-[200px]">
                <img
                  src={`https://image.tmdb.org/t/p/original/${e.poster_path}`}
                  alt=""
                  className="h-full w-full rounded-sm transition-all duration-500 hover:scale-105 cursor-pointer"
                />
              </NavLink>
              /* <iframe width="560" height="315" src="https://www.youtube.com/embed/yP-Qduvw9zY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe> */
            );
          })}
        </div>
      ) : (
        <div className="flex gap-2 h-36 w-screen pt-5 pl-10 bg-black overflow-x-auto no-scrollbar">
          {movies.map((e) => {
            return (
              <NavLink to={`/movie/:${e.id}`} className="min-w-[250px]">
                <img
                  src={`https://image.tmdb.org/t/p/original/${e.backdrop_path}`}
                  alt=""
                  className="h-full w-full rounded-sm transition-all duration-500 hover:scale-105 cursor-pointer"
                />
              </NavLink>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Row;
