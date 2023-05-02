import "./App.css";
import { Person } from "../models/person";
import PersonInfo from "./PersonInfo";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

interface Props {
  searchResults: Person[];
}

function SearchResult({ searchResults }: Props) {
  return (
    <List>
      {searchResults.map((person: Person) => (
        <ListItem key={person.id} disablePadding>
          <PersonInfo person={person} />
        </ListItem>
      ))}
    </List>
  );
}

export default SearchResult;
