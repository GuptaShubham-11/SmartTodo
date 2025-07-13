import React from 'react';
import './ComparisonCard.css';

interface ComparisonItem {
  icon: React.ReactNode;
  text: string;
}

interface ComparisonCardProps {
  icon: React.ReactNode;
  title: string;
  items: ComparisonItem[];
  type: string; // example: 'smarttodo' or 'competitor'
}

const ComparisonCard: React.FC<ComparisonCardProps> = ({
  icon,
  title,
  items,
  type,
}) => {
  return (
    <div className={`compare__card compare__card--${type}`}>
      <h3 className="compare__title">
        {icon} {title}
      </h3>
      <ul className="compare__list">
        {items.map((item, index) => (
          <li className="compare__item" key={index}>
            <div className="compare__icon">{item.icon}</div>
            {item.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ComparisonCard;
