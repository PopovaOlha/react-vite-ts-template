import React from 'react';
import './HeroCard.css';
import { HeroCardProps } from '../../types/interfaces';

function HeroCard(props: HeroCardProps) {
  const { hero, onClose } = props;

  return (
    <div className="hero-card">
      <div className="hero-card-content">
        <h3>{hero.name}</h3>
        <p>{hero.description}</p>
        <img src={hero.image} alt={hero.name} />
      </div>
      <button onClick={onClose}>Close</button>
    </div>
  );
}

export default HeroCard;
