import React from 'react';
import './ConsumpModal.css';

const ConsumpModal = ({ show, closeModal, children }) => {
    if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={closeModal}>X</button>
        {children}
      </div>
    </div>
  );
};

export default ConsumpModal;