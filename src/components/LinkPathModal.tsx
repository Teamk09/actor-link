import React, { useRef, useEffect } from 'react';
import './LinkPathModal.css';

interface LinkPathModalProps {
  linkPath: string[][] | null;
  onClose: () => void;
  error?: string | null;
  isSameActorError?: boolean; // NEW PROP
}

const LinkPathModal: React.FC<LinkPathModalProps> = ({ linkPath, onClose, error, isSameActorError }) => {
  const modalContentRef = useRef<HTMLDivElement>(null); // Ref for modal content

  useEffect(() => {
    if (modalContentRef.current) {
      modalContentRef.current.classList.add('fade-in-modal'); // Add class to trigger fade-in
    }
    return () => {
      if (modalContentRef.current) {
        modalContentRef.current.classList.remove('fade-in-modal'); // Remove class on unmount for next open
      }
    };
  }, []);


  if (!linkPath || linkPath.length === 0) {
    let message = "No link path found.";
    if (error && !isSameActorError) { // Only use general error if not same actor error
      message = error;
    }

    if (isSameActorError) { // Directly check boolean prop
      return (
        <div className="link-path-modal">
          <div className="modal-content fade-in-modal" ref={modalContentRef}> {/* Apply fade-in to modal content */}
            < p>That's the same actor silly! 😂</p >
            <button onClick={onClose}>Close</button>
          </div>
        </div>
      );
    }

    return (
      <div className="link-path-modal">
        <div className="modal-content fade-in-modal" ref={modalContentRef}> {/* Apply fade-in to modal content */}
          <p>{message}</p>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    );
  }

  return (
    <div className="link-path-modal">
      <div className="modal-content fade-in-modal" ref={modalContentRef}> {/* Apply fade-in to modal content */}
        <div className="close-button-container">
          <button className="close-button" onClick={onClose}>X</button>
        </div>
        {linkPath.map((link, index) => (
          <React.Fragment key={index}>
            <div className="step-box animated fade-in">
              <div className="link-segment">
                <div className="actor-box">{link[0]}</div>
                <div className="relation-text">was in</div>
                <div className="movie-box">{link[1]}</div>
                <div className="relation-text">with</div>
                <div className="actor-box">{link[2]}</div>
              </div>
            </div>
            {index < linkPath.length - 1 && <div className="arrow animated fade-in">↓</div>}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default LinkPathModal;