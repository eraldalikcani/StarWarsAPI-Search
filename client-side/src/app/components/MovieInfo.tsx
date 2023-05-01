import "./App.css";
import { Film } from "../models/person";

interface Props {
  film: Film;
}

function MovieInfo({ film }: Props) {
  return (
    <>
      <p>Title: {film.title} </p>
      <p>Episode: {film.episode_id}</p>
      <p>Director: {film.director}</p>
      <p>Release Date: {film.release_date}</p>
    </>
  );
}

export default MovieInfo;
