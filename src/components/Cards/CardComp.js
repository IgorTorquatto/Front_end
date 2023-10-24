import React from 'react';
import './CardComp.css'

export const CardComp = ({ title, description, imageSrc }) => {
  return (
    <div className="card">
      <img src={imageSrc} className="card-img-top imageStyle" alt="card" />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{description}</p>
      </div>
    </div>
  );
};
