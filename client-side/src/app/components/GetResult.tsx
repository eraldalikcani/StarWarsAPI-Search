import "./App.css";
import { Person } from "../models/person";
import PersonInfo from "./PersonInfo";

interface Props {
  getResults: Person | null;
}

function GetResult({ getResults }: Props) {
  return (
    <>
      <ul>
        {getResults && (
          <li key={getResults.id}>
            <PersonInfo person={getResults} />
          </li>
        )}
      </ul>
    </>
  );
}

export default GetResult;
