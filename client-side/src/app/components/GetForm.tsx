import "./App.css";

interface Props {
  getPersonId: number;
  setGetPersonId: (id: number) => void;
  handleGetSubmit: () => void;
}

function GetForm({ getPersonId, setGetPersonId, handleGetSubmit }: Props) {
  return (
    <label>
      Get by ID:
      <input
        type="number"
        value={getPersonId}
        onChange={(e) => setGetPersonId(Number(e.target.value))}
      />
      <button onClick={handleGetSubmit}>Get</button>
    </label>
  );
}

export default GetForm;
