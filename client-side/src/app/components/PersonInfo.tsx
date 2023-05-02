import "./App.css";
import Card from "@mui/material/Card";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Person } from "../models/person";
import MovieInfo from "./MovieInfo";

interface Props {
  person: Person;
}

function PersonInfo({ person }: Props) {
  return (
    <Card
      sx={{
        backgroundColor: "transparent",
        boxShadow: "none",
        p: 2,
        minWidth: 275,
      }}
    >
      <CardContent>
        <Typography variant="h5" component="div" color="azure">
          Person
        </Typography>
        <Typography variant="body2" color="azure">
          Id: {person.id}
          <br />
          Name: {person.name}
          <br />
          Birth Year: {person.birth_year}
          <br />
          Gender: {person.gender}
          <br />
          Height: {person.height}
          <br />
          Weight: {person.weight}
        </Typography>
        <Typography variant="h6" component="div" color="azure">
          Movies:
        </Typography>
        <List>
          {person.films.map((film, index) => (
            <ListItem key={index} disablePadding>
              <MovieInfo film={film} />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
}

export default PersonInfo;
