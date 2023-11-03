import React from 'react';
import './Card.css'

export const Card = ({ title, description, imageSrc }) => {
  return (
    <div className="card">
      <img src={imageSrc} className="card-img-top card-image" alt="card" />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{description}</p>
      </div>
    </div>
  );
};
