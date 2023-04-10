import React, { useState, useEffect } from "react";
import axios from "./axios";
import request from "./requests";

const Banner = () => {
  const [banner, setBanner] = useState({});

  useEffect(() => {
    const getMovieData = async () => {
      try {
        const results = await axios.get(request.fetchTrending);
        let movieIndex = Math.floor(
          Math.random() * results.data.results.length - 1
        );

        setBanner(results.data.results[movieIndex]);

        return request;
      } catch (error) {
        console.log(error);
      }
    };
    getMovieData();
  }, []);

  /* -------------------------------------------- */
  function movieDescTruncate(desc, n) {
    if (desc) return desc.length > n ? desc.slice(0, n - 1) + "..." : desc;
  }
  /* -------------------------------------------- */

  return (
    <div
      className="bg-cover bg-center h-5/6 "
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original/${banner?.backdrop_path})`,
      }}
    >
      <div className="flex flex-col ml-10 justify-center h-5/6 gap-2 w-1/3  text-white pt-10">
        <div className="title text-5xl font-extrabold">
          {banner?.title || banner?.original_title || banner?.original_name}
        </div>
        <div className="btn_list flex font-bold">
          <button className="h-8 w-28 p-2 m-2 bg-slate-900/30 rounded-sm flex items-center justify-center active:scale-95 border border-white ">
            Play
          </button>
          <button className="h-8 w-28 p-2 m-2 bg-slate-900/30   rounded-sm flex items-center justify-center active:scale-95 border border-white">
            My List
          </button>
        </div>
        <div className="movie_desc font-bold">
          {movieDescTruncate(banner?.overview, 200)}
        </div>
      </div>
      <div className="h-1/6  bg-gradient-to-b from-transparent to-black"></div>
    </div>
  );
};

export default Banner;
