import "./App.css";
import { Person } from "../models/person";
import PersonInfo from "./PersonInfo";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

interface Props {
  getResults: Person | null;
}

function GetResult({ getResults }: Props) {
  return (
    <List>
      {getResults && (
        <ListItem key={getResults.id} disablePadding>
          <PersonInfo person={getResults} />
        </ListItem>
      )}
    </List>
  );
}

export default GetResult;
