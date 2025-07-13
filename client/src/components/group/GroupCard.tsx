import type { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users2 } from 'lucide-react';
import './GroupCard.css';

interface GroupCardProps {
  id: string;
  name: string;
  owner: string;
  createdAt: string;
  members: string[];
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
  }).format(date);
};

const GroupCard: FC<GroupCardProps> = ({
  id,
  name,
  owner,
  createdAt,
  members,
}) => {
  const navigate = useNavigate();

  return (
    <div
      className="GroupCard-container"
      onClick={() => navigate(`/groups/${id}/boards`)}
      role="button"
    >
      <div className="GroupCard-header">
        <h2 className="GroupCard-title">{name}</h2>
      </div>

      <div className="GroupCard-body">
        <div className="GroupCard-info">
          <span className="GroupCard-label">
            <Users2 size={16} className="GroupCard-icon" />
            Members
          </span>
          <span className="GroupCard-badge">{members.length}</span>
        </div>
        <div className="GroupCard-info">
          <span className="GroupCard-date">{formatDate(createdAt)}</span>
          <span className="GroupCard-value">Created By {owner}</span>
        </div>
      </div>
    </div>
  );
};

export default GroupCard;
