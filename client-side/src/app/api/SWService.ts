import axios from "axios";
import { Film, Person } from "../models/person";

const SWAPI_BASE_URL = "https://swapi.dev/api/";

const BACKEND_API_ENDPOINT = "http://localhost:5000/api/calls";

async function getApiCalls(call: string) {
  // Send API call data to backend
  axios
    .post(BACKEND_API_ENDPOINT, {
      endpoint: call,
    })
    .then(() => {
      console.log("Successfully sent API call data to backend");
    })
    .catch((error) => {
      console.error("Error sending API call data to backend:", error);
    });
  return call;
}

/**
 * Search persons by query string in the Star Wars API.
 * @param {string} query - Query string to search for persons.
 * @returns {Promise<Person[]>} Array of person objects.
 */
async function searchPersons(query: string): Promise<Person[]> {
  // Send API call to Star Wars API to search for persons
  const response = await axios.get(`${SWAPI_BASE_URL}people`, {
    params: {
      search: query,
    },
  });

  // Send API call data to backend
  getApiCalls(`/people?search=${query}`);

  // Extract results from API response
  const results = response.data.results;

  // Create an empty array to hold person objects
  const persons: Person[] = [];

  // Loop through results and create a person object for each result
  for (const result of results) {
    // Create a person object with relevant information
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

    // Add the person object to the persons array
    persons.push(person);
  }

  // Return the persons array
  return persons;
}

/**
 * Retrieves a Person object by ID from the Star Wars API
 * @param {number} id - The ID of the person to retrieve
 * @returns {Promise<Person>} A Promise that resolves with the Person object
 * @throws {Error} If the person is not found, or if there is an error with the API call
 */
async function getPerson(id: number): Promise<Person> {
  try {
    // Make API request to retrieve person data by ID
    const response = await axios.get(`${SWAPI_BASE_URL}people/${id}/`);

    // Log API call data to backend
    getApiCalls(`/people/${id}/`);

    // Extract relevant data from response
    const result = response.data;

    // Build Person object with extracted data
    const person: Person = {
      id: id,
      name: result.name,
      birth_year: result.birth_year,
      gender: result.gender.toUpperCase(),
      height: result.height,
      weight: result.mass,
      films: result.films ? await getMovies(result.films) : [],
    };

    // Return Person object
    return person;
  } catch (error: any) {
    // If the error is a 404 (Person not found), throw a custom error message
    if (error.response && error.response.status === 404) {
      throw new Error(`Person not found`);
    }

    // If the error is something else, re-throw it
    throw error;
  }
}

/**
 * Returns an array of Film objects corresponding to the given list of film URLs.
 * @param films - An array of URLs representing the films to retrieve.
 * @returns An array of Film objects.
 */
async function getMovies(films: string[]): Promise<Film[]> {
  // Create an array of promises to retrieve each film's data using axios.
  const moviePromises = films.map((url) =>
    axios.get(url).then((res) => res.data)
  );

  // Wait for all the promises to resolve and collect the movie data.
  const movieData = await Promise.all(moviePromises);

  // Map the movie data to an array of Film objects.
  const movies = movieData.map((movie) => ({
    title: movie.title,
    episode_id: movie.episode_id,
    director: movie.director,
    release_date: movie.release_date,
  }));
  // Return array of Film objects
  return movies;
}

const swService = {
  searchPersons,
  getPerson,
  getMovies,
  getApiCalls,
};

export default swService;
