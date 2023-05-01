import "./App.css";

interface Props {
  searchQuery: string;
  setSearchQuery: (name: string) => void;
  handleSearchbyName: () => void;
}

function SearchForm({
  searchQuery,
  setSearchQuery,
  handleSearchbyName,
}: Props) {
  return (
    <label>
      Search by Name:
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button onClick={handleSearchbyName}>Search</button>
    </label>
  );
}

export default SearchForm;
