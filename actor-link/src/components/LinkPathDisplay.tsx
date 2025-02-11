import React from 'react';
import './LinkPathDisplay.css';

interface LinkPathDisplayProps {
  linkPath: string[][] | null;
}

const LinkPathDisplay: React.FC<LinkPathDisplayProps> = ({ linkPath }) => {
  if (!linkPath || linkPath.length === 0) {
    return <p>No link path found.</p>;
  }

  return (
    <div className="link-path-container">
      {linkPath.map((link, index) => (
        <div key={index} className="link-segment">
          <div className="actor-box animated fade-in">{link[0]}</div>
          <span className="relation-text animated fade-in">was in</span>
          <div className="movie-box animated fade-in">{link[1]}</div>
          <span className="relation-text animated fade-in">with</span>
          <div className="actor-box animated fade-in">{link[2]}</div>
          {index < linkPath.length - 1 && <div className="arrow animated fade-in">→</div>}
        </div>
      ))}
    </div>
  );
};

export default LinkPathDisplay;