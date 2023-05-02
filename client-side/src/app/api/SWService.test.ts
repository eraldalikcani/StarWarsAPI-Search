import swService from "./SWService";

describe("swService", () => {
  describe("searchPersons", () => {
    test("returns an array of Person objects when given a query", async () => {
      const persons = await swService.searchPersons("Luke Skywalker");
      expect(Array.isArray(persons)).toBe(true);

      const expectedPerson = [
        {
          id: 1,
          name: "Luke Skywalker",
          birth_year: "19BBY",
          gender: "MALE",
          height: "172",
          weight: "77",
          films: [
            {
              title: "A New Hope",
              episode_id: 4,
              director: "George Lucas",
              release_date: "1977-05-25",
            },
            {
              title: "The Empire Strikes Back",
              episode_id: 5,
              director: "Irvin Kershner",
              release_date: "1980-05-17",
            },
            {
              title: "Return of the Jedi",
              episode_id: 6,
              director: "Richard Marquand",
              release_date: "1983-05-25",
            },
            {
              title: "Revenge of the Sith",
              episode_id: 3,
              director: "George Lucas",
              release_date: "2005-05-19",
            },
          ],
        },
      ];

      expect(persons).toEqual(expectedPerson);
    }, 10000);
  });

  describe("getPerson", () => {
    test("returns a Person object when given an ID", async () => {
      const person = await swService.getPerson(1);

      const expectedPerson = {
        id: 1,
        name: "Luke Skywalker",
        birth_year: "19BBY",
        gender: "MALE",
        height: "172",
        weight: "77",
        films: [
          {
            title: "A New Hope",
            episode_id: 4,
            director: "George Lucas",
            release_date: "1977-05-25",
          },
          {
            title: "The Empire Strikes Back",
            episode_id: 5,
            director: "Irvin Kershner",
            release_date: "1980-05-17",
          },
          {
            title: "Return of the Jedi",
            episode_id: 6,
            director: "Richard Marquand",
            release_date: "1983-05-25",
          },
          {
            title: "Revenge of the Sith",
            episode_id: 3,
            director: "George Lucas",
            release_date: "2005-05-19",
          },
        ],
      };

      expect(person).toEqual(expectedPerson);
    }, 20000);

    test("throws an error when given an invalid ID", async () => {
      await expect(swService.getPerson(999)).rejects.toThrow(
        "Person not found"
      );
    }, 10000);
  });

  describe("getMovies", () => {
    test("returns an array of Film objects when given an array of film URLs", async () => {
      const films = await swService.getMovies([
        "https://swapi.dev/api/films/1/",
        "https://swapi.dev/api/films/2/",
        "https://swapi.dev/api/films/3/",
        "https://swapi.dev/api/films/6/",
      ]);

      const expectedFilms = [
        {
          title: "A New Hope",
          episode_id: 4,
          director: "George Lucas",
          release_date: "1977-05-25",
        },
        {
          title: "The Empire Strikes Back",
          episode_id: 5,
          director: "Irvin Kershner",
          release_date: "1980-05-17",
        },
        {
          title: "Return of the Jedi",
          episode_id: 6,
          director: "Richard Marquand",
          release_date: "1983-05-25",
        },
        {
          title: "Revenge of the Sith",
          episode_id: 3,
          director: "George Lucas",
          release_date: "2005-05-19",
        },
      ];

      expect(Array.isArray(films)).toBe(true);
      expect(films).toEqual(expectedFilms);
    }, 10000);
  });
});
