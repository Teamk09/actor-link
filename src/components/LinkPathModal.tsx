import React from 'react';
import './LinkPathModal.css';

interface LinkPathModalProps {
  linkPath: string[][] | null;
  onClose: () => void;
}

const LinkPathModal: React.FC<LinkPathModalProps> = ({ linkPath, onClose }) => {
  if (!linkPath || linkPath.length === 0) {
    return (
      <div className="link-path-modal">
        <div className="modal-content">
          <p>No link path found.</p>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    );
  }

  return (
    <div className="link-path-modal">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>X</button>
        {linkPath.map((link, index) => (
          <React.Fragment key={index}> {/* Fragment to avoid extra div */}
            <div className="step-box animated fade-in">
              <div className="link-segment">
                <div className="actor-box">{link[0]}</div>
                <div className="relation-text">was in</div>
                <div className="movie-box">{link[1]}</div>
                <div className="relation-text">with</div>
                <div className="actor-box">{link[2]}</div>
              </div>
            </div>
            {index < linkPath.length - 1 && <div className="arrow animated fade-in">↓</div>} {/* Vertical Arrow BETWEEN boxes */}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default LinkPathModal;