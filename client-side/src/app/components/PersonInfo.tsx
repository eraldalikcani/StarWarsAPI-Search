import "./App.css";
import { Person } from "../models/person";
import MovieInfo from "./MovieInfo";

interface Props {
  person: Person;
}

function PersonInfo({ person }: Props) {
  return (
    <>
      <h3>Person</h3>
      <p>Id: {person.id}</p>
      <p>Name: {person.name}</p>
      <p>Birth Year: {person.birth_year}</p>
      <p>Gender: {person.gender}</p>
      <p>Height: {person.height} cm</p>
      <p>Weight: {person.weight} kg</p>
      <h3>Movies</h3>
      <ul>
        {person.films.map((film, index) => (
          <li key={index}>
            <MovieInfo film={film} />
          </li>
        ))}
      </ul>
    </>
  );
}

export default PersonInfo;
