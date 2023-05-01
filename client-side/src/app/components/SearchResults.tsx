import "./App.css";
import { Person } from "../models/person";
import PersonInfo from "./PersonInfo";

interface Props {
  searchResults: Person[];
}

function SearchResult({ searchResults }: Props) {
  return (
    <>
      <ul>
        {searchResults.map((person: Person) => (
          <li key={person.id}>
            <PersonInfo person={person} />
          </li>
        ))}
      </ul>
    </>
  );
}

export default SearchResult;
