import React, { useState, useEffect } from "react";
import axios from "./axios";
import { NavLink } from "react-router-dom";
import BlurredImageComponent from './BlurredImageComponent';

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

  return movies.length === 0 ? (
    <>
      <div className="bg-black pt-10">
        <div className="header text-lg text-white font-semibold pl-10">
          {title}
        </div>
        {props?.isLarge === "True" ? (
          <div className="flex gap-2 h-72 w-screen pt-5 pl-10 bg-black overflow-x-auto no-scrollbar">
            {Array(20)
              .fill(0)
              .map((e) => {
                console.log(e);
                return (
                  <div className="min-w-[200px] animate-pulse bg-gray-500"></div>
                );
              })}
          </div>
        ) : (
          <div className="flex gap-2 h-36 w-screen pt-5 pl-10 bg-black overflow-x-auto no-scrollbar">
            {Array(20)
              .fill(0)
              .map((e) => {
                console.log(e);
                return (
                  <div className="min-w-[200px] animate-pulse  bg-gray-500"></div>
                );
              })}
          </div>
        )}
      </div>
    </>
  ) : (
    <div className="bg-black pt-10">
      <div className="header text-lg text-white font-semibold">{title}</div>
      {props?.isLarge === "True" ? (
        <div className="flex gap-2  w-screen pt-5  bg-black overflow-x-auto no-scrollbar">
          {movies.map((e) => {
      
            return (
              <NavLink to={`/tv/:${e.id}`} className={`min-w-[200px]`}>
                
                <BlurredImageComponent
                  src={`https://image.tmdb.org/t/p/original/${e.poster_path}`}
                />
              </NavLink>
            );
          })}
        </div>
      ) : (
        <div className="flex gap-2 h-36 w-screen pt-5  bg-black overflow-x-auto no-scrollbar">
          {movies.map((e) => {
            return (
              <NavLink
                to={`/movie/:${e.id}`}
                className={`min-w-[250px]`}>
                

                <BlurredImageComponent
                  src={`https://image.tmdb.org/t/p/original/${e.backdrop_path}`}
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
