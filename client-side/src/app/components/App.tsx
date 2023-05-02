import { useState } from "react";
import swService from "../api/SWService";
import { Person } from "../models/person";
import "./App.css";
import SearchForm from "./SearchForm";
import GetForm from "./GetForm";
import SearchResult from "./SearchResults";
import GetResult from "./GetResult";
import Loading from "./Loading";
import Error from "./Error";

function App() {
  // Initialize state variables
  const [searchQuery, setSearchQuery] = useState(""); // stores the search query input by the user
  const [searchResults, setSearchResults] = useState<Person[]>([]); // stores the search results returned by the API
  const [getPersonId, setGetPersonId] = useState(1); // stores the person ID input by the user for get request
  const [getResults, setGetResults] = useState<Person | null>(null); // stores the person object returned by the get request
  const [error, setError] = useState<string | null>(null); // stores the error message returned by the API
  const [isLoading, setIsLoading] = useState(false); //stores the loading state

  // Function to handle search by name
  const handleSearchbyName = async () => {
    setSearchResults([]);
    setGetResults(null);
    setIsLoading(true);
    try {
      const data = await swService.searchPersons(searchQuery); // call searchPersons API method with search query
      console.log(data);
      setSearchResults(data); // update state with search results
      setError(null); // reset error state
    } catch (error: any) {
      console.error(error);
    } finally {
      setIsLoading(false); // set loading state back to false
    }
  };

  // Function to handle get person by ID
  const handleGetSubmit = async () => {
    setGetResults(null);
    setSearchResults([]);
    setIsLoading(true);
    try {
      const response = await swService.getPerson(getPersonId); // call getPerson API method with person ID
      console.log(response);
      setGetResults(response); // update state with person object
      setError(null); // reset error state
    } catch (error: any) {
      setError(error.message); // update error state with error message
    } finally {
      setIsLoading(false); // set loading state back to false
    }
  };

  return (
    <>
      <h1>Star Wars Characters</h1>
      <SearchForm
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearchbyName={handleSearchbyName}
      />
      <GetForm
        getPersonId={getPersonId}
        setGetPersonId={setGetPersonId}
        handleGetSubmit={handleGetSubmit}
      />
      <>
        <h1>Results</h1>
        {isLoading && <Loading />}
        {searchResults.length > 0 ? (
          <SearchResult searchResults={searchResults} />
        ) : (
          <>
            {error ? (
              <label>
                <Error message={error} />
              </label>
            ) : (
              <>
                <GetResult getResults={getResults} />
              </>
            )}
          </>
        )}
      </>
    </>
  );
}

export default App;
