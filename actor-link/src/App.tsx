import { useState } from 'react'
import './App.css'

function App() {
  const [actor1Name, setActor1Name] = useState('');
  const [actor2Name, setActor2Name] = useState('');
  const [linkPath, setLinkPath] = useState<string[][] | null>(null);
  const [linkNumber, setLinkNumber] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const findLink = async () => {
    setError(null); // Reset error state before making a new request
    setLinkPath(null); // Reset linkPath state
    setLinkNumber(null); // Reset linkNumber state

    try {
      const response = await fetch('http://localhost:8080/api/actor-link', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          start_actor_name: actor1Name,
          target_actor_name: actor2Name,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("API Response:", data); // Log the response to the console for debugging

      if (data.error) {
        setError(data.error);
      } else {
        setLinkPath(data.link_path);
        setLinkNumber(data.link_number);
      }
    } catch (e) {
      setError(`Failed to fetch link: ${(e as Error).message}`);
      console.error("Fetch error:", e); // Log the error to the console
    }
  };

  return (
    <>
      <h1>Actor Link</h1>
      <div className="input-area">
        <div className="input-group">
          <label htmlFor="actor1">First Actor:</label>
          <input
            type="text"
            id="actor1"
            placeholder="Enter first actor's name"
            value={actor1Name}
            onChange={(e) => setActor1Name(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label htmlFor="actor2">Second Actor:</label>
          <input
            type="text"
            id="actor2"
            placeholder="Enter second actor's name"
            value={actor2Name}
            onChange={(e) => setActor2Name(e.target.value)}
          />
        </div>
        <button onClick={findLink}>Find Link</button>
      </div>
      {error && <p className="error">Error: {error}</p>}
      {linkPath && (
        <div className="results">
          <p>Link Number: {linkNumber}</p>
          <p>Link Path: {linkPath.map(link => `[${link[0]}, ${link[1]}, ${link[2]}]`).join(' -> ')}</p>
        </div>
      )}
      <p className="read-the-docs">
        Enter two actor names to find the link between them.
      </p>
    </>
  )
}

export default App