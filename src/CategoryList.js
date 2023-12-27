import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import { NavLink } from "react-router-dom";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import BlurredImageComponent from './BlurredImageComponent';

const CategoryList = () => {
  let { id, contentType } = useParams();
  id = id.substring(1);
  contentType = contentType.substring(1);
  console.log(contentType);
  console.log(id);

  const [movies, setMovies] = useState([]);

  const [currPage, setCurrPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const API_URL = `https://api.themoviedb.org/3/discover/${contentType}?api_key=716a23024113aad0cd75c8523bc1dea2&with_genres=${id}&page=${currPage}`;

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
    getMovies(API_URL);
  }, [currPage, API_URL]);
  console.log(movies);
  return movies.length === 0 ? (
    <div className="bg-black h-screen w-screen">
      <Navbar />

      {
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 grid-flow-row gap-4 w-screen p-5 bg-black ">
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
      }
    </div>
  ) : (
    <div className="bg-black h-screen w-screen">
      <Navbar />

      <div className="flex flex-col pt-20">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 grid-flow-row gap-4  w-screen p-5 bg-black ">
          {movies.map((e) => {
            return (
              <NavLink
                to={`/${contentType}/:${e.id}`}
                className={`min-w-[200px] `}>               
                <BlurredImageComponent
                  src={`https://image.tmdb.org/t/p/original/${e.poster_path}`}
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

export default CategoryList;
