import React from 'react';
import './Card.css'

export const Card = ({ title, description, imageSrc }) => {
  return (
    <div className="card-home">
      <img src={imageSrc} className="card-img-top card-image" alt="card" />
      <div className="card-home-body">
        <h5 className="card-home-title">{title}</h5>
        <p className="card-home-text">{description}</p>
      </div>
    </div>
  );
};
