import { useState } from 'react'
import './App.css'
import LinkPathModal from './components/LinkPathModal';

function capitalizeEachWord(str: string): string {
  return str.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

function App() {
  const [actor1Name, setActor1Name] = useState('');
  const [actor2Name, setActor2Name] = useState('');
  const [linkPath, setLinkPath] = useState<string[][] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const findLink = async () => {
    if (actor1Name.trim().toLowerCase() === actor2Name.trim().toLowerCase()) {
      setError("That's the same actor silly! 😂");
      setLinkPath(null);
      setIsModalOpen(true);
      setIsLoading(false);
      return;
    }

    setError(null);
    setLinkPath(null);
    setIsModalOpen(false);
    setIsLoading(true);

    try {
      const response = await fetch('https://o31j7genpi.execute-api.us-east-1.amazonaws.com/deploy/api/actor-link/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          start_actor_name: actor1Name.trim(),
          target_actor_name: actor2Name.trim(),
        }),
      });

      if (!response.ok) {
        if (response.status === 404) {
          setError("Actor not found!");
        } else {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      }

      const data = await response.json();
      console.log("API Response:", data);

      setIsLoading(false);

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
    setLinkPath(null);
    setError(null); // ADD THIS LINE: Reset the error state
  };

  return (
    <>
    <h1>Actor Link</h1>
      <div className="input-area">
        <div className="input-group">
          <label htmlFor="actor1">Actor 1 Name:</label>
          <input
            type="text"
            id="actor1"
            placeholder="Enter actor name"
            value={actor1Name}
            onChange={(e) => setActor1Name(capitalizeEachWord(e.target.value))}
          />
        </div>
        <div className="input-group">
          <label htmlFor="actor2">Actor 2 Name:</label>
          <input
            type="text"
            id="actor2"
            placeholder="Enter actor name"
            value={actor2Name}
            onChange={(e) => setActor2Name(capitalizeEachWord(e.target.value))}
          />
        </div>
        <button onClick={findLink} disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Find Link'}
        </button>

        {error && !isModalOpen && <div className="error">{error}</div>}
        {isLoading && !error && <div className="loading-message">Loading...</div>}
      </div>

      {isModalOpen && (
        <LinkPathModal
          linkPath={linkPath}
          onClose={closeModal}
          error={error}
        />
      )}
    </>
  );
}

export default App