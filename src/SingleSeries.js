import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";

const SingleSeries = () => {
  let { id } = useParams();
  id = id.substring(1);
  const [singleMovie, setSingleMovie] = useState({});
  function movieDescTruncate(desc, n) {
    if (desc) return desc.length > n ? desc.slice(0, n - 1) + "..." : desc;
  }
  useEffect(() => {
    const getMovieData = async () => {
      try {
        const URL = `https://api.themoviedb.org/3/tv/${id}?api_key=716a23024113aad0cd75c8523bc1dea2&language=en-US&append_to_response=videos`;
        console.log(URL);
        console.log(URL);
        const results = await fetch(URL);
        const data = await results.json();
        console.log(data);
        setSingleMovie(data);
        return URL;
      } catch (error) {
        console.log(error);
      }
    };
    getMovieData();
  }, [id]);
  console.log(singleMovie);
  let TrailerLink = "";

  if (
    Object.keys(singleMovie).length > 0 &&
    singleMovie?.videos?.results.length > 0
  ) {
    let trailer_arr = singleMovie?.videos?.results.filter((e) =>
      e.name.toLowerCase().includes("trailer"),
    );
    console.log(trailer_arr);
    TrailerLink = `https://www.youtube.com/watch?v=${trailer_arr[0].key}`;
    console.log(TrailerLink);
  }
  return (
    <div className="h-screen w-screen bg-black">
      <Navbar />
      {Object.keys(singleMovie).length > 0 ? (
        <>
          <div
            className="bg-cover bg-center h-full  
            "
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/original/${singleMovie?.backdrop_path})`,
            }}>
            <div className="flex flex-col pl-10 justify-center h-full gap-2  w-full md:w-2/3 text-white pt-10 bg-gradient-to-r from-black to-transparent">
              <div className="title text-3xl md:text-5xl  font-extrabold">
                {singleMovie?.title ||
                  singleMovie?.original_title ||
                  singleMovie?.original_name}
              </div>
              <div className="btn_list flex font-bold">
                <a
                  className="h-8 w-28 p-2 m-2 bg-slate-900/30 rounded-sm flex items-center justify-center active:scale-95 border border-white "
                  target="_blank"
                  rel="noreferrer"
                  href={`https://www.imdb.com/title/${singleMovie?.imdb_id}/`}>
                  IMDB Link
                </a>
                {singleMovie?.videos?.results.length > 0 ? (
                  <a
                    className="h-8 w-28 p-2 m-2 bg-slate-900/30 rounded-sm flex items-center justify-center active:scale-95 border border-white "
                    target="_blank"
                    rel="noreferrer"
                    href={TrailerLink}>
                    Play Trailer
                  </a>
                ) : (
                  <></>
                )}
              </div>
              <div className="font-bold">
                Genre:
                {singleMovie?.genres?.map((e, index) => {
                  return (
                    <span className="p-2" key={index}>
                      {e.name}
                    </span>
                  );
                })}
              </div>
              <div className="font-bold">
                IMDB Rating:
                <span className="p-2">{singleMovie?.vote_average}</span>
              </div>
              <div className="font-bold">
                Release Date:
                <span className="p-2">{singleMovie?.release_date}</span>
              </div>
              <div className="movie_desc font-bold w-full md:w-1/2">
                {movieDescTruncate(singleMovie?.overview, 300)}
              </div>
            </div>
          </div>
        </>
      ) : (
        <>Hello</>
      )}
    </div>
  );
};

export default SingleSeries;
