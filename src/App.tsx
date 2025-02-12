import { useState } from 'react'
import './App.css'
import LinkPathModal from './components/LinkPathModal';

function App() {
  const [actor1Name, setActor1Name] = useState('');
  const [actor2Name, setActor2Name] = useState('');
  const [linkPath, setLinkPath] = useState<string[][] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // NEW: Loading state

  const findLink = async () => {
    setError(null);
    setLinkPath(null);
    setIsModalOpen(false);
    setIsLoading(true); // NEW: Set loading to true before API call

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
      console.log("API Response:", data);

      setIsLoading(false); // NEW: Set loading to false after API call success

      if (data.error) {
        setError(data.error);
      } else {
        setLinkPath(data.link_path);
        setIsModalOpen(true);
      }
    } catch (e) {
      setIsLoading(false);
      setError(`Failed to fetch link: ${(e as Error).message}`);
      console.error("Fetch error:", e);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
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
        <button onClick={findLink} disabled={isLoading}> {/* NEW: Disable button while loading */}
          Find Link
        </button>
      </div>

      {isLoading && ( // NEW: Conditionally render loading message
        <div className="loading-message">
          Finding link
          <span className="loading-dots">
            <span>.</span><span>.</span><span>.</span>
          </span>
        </div>
      )}

      {error && <p className="error">Error: {error}</p>}
      {isModalOpen && linkPath && (
        <LinkPathModal linkPath={linkPath} onClose={closeModal} />
      )}
      <p className="read-the-docs">
        Enter two actor names to find the link between them.
      </p>
    </>
  );
}

export default App