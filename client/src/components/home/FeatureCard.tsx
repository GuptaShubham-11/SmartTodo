import React from 'react';
import './FeatureCard.css';

interface Props {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard = ({ icon, title, description }: Props) => {
  return (
    <div className="features__card fade-in">
      <div className="features__icon">{icon}</div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};

export default FeatureCard;
