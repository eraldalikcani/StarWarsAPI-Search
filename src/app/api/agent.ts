import axios from "axios";
import { Film, Person } from "../models/person";

const SWAPI_BASE_URL = "https://swapi.dev/api/";

export async function searchPersons(query: string): Promise<Person[]> {
  const response = await axios.get(`${SWAPI_BASE_URL}people`, {
    params: {
      search: query,
    },
  });

  const results = response.data.results;

  const persons: Person[] = [];

  for (const result of results) {
    const person: Person = {
      id: Number(result.url.split("/").slice(-2, -1)[0]),
      name: result.name,
      birth_year: result.birth_year,
      gender: result.gender.toUpperCase(),
      height: result.height,
      weight: result.mass,
      films: Array.isArray(result.films)
        ? await getMovies(result.films)
        : await getMovies(result.films),
    };

    persons.push(person);
  }

  return persons;
}

export async function getPerson(id: number): Promise<Person> {
  try {
    const response = await axios.get(`${SWAPI_BASE_URL}people/${id}/`);
    const result = response.data;
    const person: Person = {
      id: id,
      name: result.name,
      birth_year: result.birth_year,
      gender: result.gender.toUpperCase(),
      height: result.height,
      weight: result.mass,
      films: result.films ? await getMovies(result.films) : [],
    };
    return person;
  } catch (error: any) {
    if (error.response && error.response.status === 404) {
      throw new Error(`Error 404 - Person not found`);
    }
    throw error;
  }
}

export async function getMovies(films: string[]): Promise<Film[]> {
  const moviePromises = films.map((url) =>
    axios.get(url).then((res) => res.data)
  );
  const movieData = await Promise.all(moviePromises);
  const movies = movieData.map((movie) => ({
    title: movie.title,
    episode_id: movie.episode_id,
    director: movie.director,
    release_date: movie.release_date,
  }));
  return movies;
}

const agent = {
  searchPersons,
  getPerson,
  getMovies,
};

export default agent;
