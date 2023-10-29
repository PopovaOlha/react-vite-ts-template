import { Component } from 'react';
import './HeroCard.css';

interface HeroCardProps {
  hero: {
    name: string;
    description: string;
    image: string;
  };
  onClose: () => void;
}

class HeroCard extends Component<HeroCardProps> {
  render() {
    const { hero, onClose } = this.props;

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
}

export default HeroCard;
