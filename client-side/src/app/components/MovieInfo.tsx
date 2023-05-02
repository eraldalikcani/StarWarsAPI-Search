import "./App.css";
import { Film } from "../models/person";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

interface Props {
  film: Film;
}

function MovieInfo({ film }: Props) {
  return (
    <Typography variant="body2" color="azure">
      Title: {film.title}
      <br />
      Episode: {film.episode_id}
      <br />
      Director: {film.director}
      <br />
      Release Date: {film.release_date}
    </Typography>
  );
}

export default MovieInfo;
