import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { NavLink } from "react-router-dom";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

const MovieSearch = () => {
  const [movieSearch, setMovieSearch] = useState("");
  const [movies, setMovies] = useState([]);
  const [imgLoad, setImgLoad] = useState(false);
  const [currPage, setCurrPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const API_URL = `https://api.themoviedb.org/3/search/movie?api_key=716a23024113aad0cd75c8523bc1dea2&query=${movieSearch}&page=${currPage}`;

  const incCurrPage = () => {
    if (currPage < totalPages) setCurrPage(currPage + 1);
  };
  const decCurrPage = () => {
    if (currPage > 1) setCurrPage(currPage - 1);
  };

  const getMovies = async (API) => {
    const response = await fetch(API);

    const data = await response.json();

    setMovies(data.results.filter((e) => e.poster_path != null));
    setTotalPages(data.total_pages);

    console.log(data);
  };
  useEffect(() => {
    if (movieSearch.length === 0) {
      setCurrPage(1);
    }
    const x = setTimeout(() => {
      if (movieSearch.length > 0) getMovies(API_URL);
    }, 500);
    return () => {
      clearTimeout(x);
    };
  }, [movieSearch, currPage]);
  console.log(movies);
  return movies.length === 0 ? (
    <div className="bg-black h-screen w-screen">
      <Navbar />
      <div className="pt-16 w-full flex items-center justify-center bg-black mb-5">
        <input
          type="text"
          className="p-5 h-8 w-1/2 rounded-sm focus:outline-none focus:border-none"
          onChange={(e) => setMovieSearch(e.target.value)}
        />
      </div>
      {movieSearch.length > 0 ? (
        <>
          <div className="grid grid-cols-5 grid-rows-4 gap-4 w-screen p-5 bg-black ">
            {Array(20)
              .fill(0)
              .map((e) => {
                console.log(e);
                return (
                  <div className="min-w-[200px] animate-pulse bg-gray-500"></div>
                );
              })}
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  ) : (
    <div className="bg-black h-screen w-screen">
      <Navbar />
      <div className="pt-16 w-full flex items-center justify-center bg-black mb-5">
        <input
          type="text"
          className="p-5 h-8 w-1/2 rounded-sm focus:outline-none focus:border-none"
          onChange={(e) => setMovieSearch(e.target.value)}
        />
      </div>
      <div className="flex flex-col">
        <div className="grid auto-rows-fr grid-cols-5 gap-4  w-screen p-5 bg-black ">
          {movies.map((e) => {
            return (
              <NavLink
                to={`/movie/:${e.id}`}
                className={`min-w-[200px] ${!imgLoad ? "hidden" : "block"}`}
              >
                <img
                  src={`https://image.tmdb.org/t/p/original/${e.poster_path}`}
                  alt=""
                  className="h-full w-full rounded-sm transition-all duration-500 hover:scale-105 cursor-pointer"
                  onLoad={() => {
                    setImgLoad(true);
                  }}
                />
              </NavLink>
            );
          })}
        </div>
        <div className="bg-black h-8 text-white flex items-center justify-center gap-5">
          <HiChevronLeft
            className="text-2xl hover:cursor-pointer hover:scale-105"
            onClick={() => {
              decCurrPage();
            }}
          />
          <div>{`Displaying ${currPage} of ${totalPages} pages`}</div>
          <HiChevronRight
            className="text-2xl hover:cursor-pointer hover:scale-105"
            onClick={() => {
              incCurrPage();
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default MovieSearch;
