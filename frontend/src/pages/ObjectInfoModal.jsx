import React from 'react';
import './ObjectInfoModal.css';

const ObjectInfoModal = ({ objectDetails, handleClose }) => {
  const { description, imageUrl, videoUrl } = objectDetails;

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={handleClose}>&times;</span>
        <h2>{objectDetails.name}</h2>
        <p>{description}</p>
        <img src={imageUrl} alt={`${objectDetails.name}`} />
        <div className="video-container">
          <iframe
            width="100%"
            height="315"
            src={videoUrl}
            title={`${objectDetails.name} video`}
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default ObjectInfoModal;
