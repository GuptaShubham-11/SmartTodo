import React, { useEffect, useRef, useState } from 'react';
import './BoardCard.css';
import { LayoutDashboard, MoreVertical } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface BoardCardProps {
  groupId: string;
  boardId: string;
  name: string;
  // onEdit?: (boardId: string) => void;
  onDelete?: (boardId: string) => void;
  isOwner?: boolean;
}

const BoardCard: React.FC<BoardCardProps> = ({
  groupId,
  boardId,
  name,
  // onEdit,
  onDelete,
  isOwner,
}) => {
  const navigate = useNavigate();
  const [showActions, setShowActions] = useState(false);
  const actionsRef = useRef<HTMLDivElement>(null);

  const handleNavigate = () => {
    navigate(`/groups/${groupId}/boards/${boardId}`);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        actionsRef.current &&
        !actionsRef.current.contains(e.target as Node)
      ) {
        setShowActions(false);
      }
    };
    if (showActions) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showActions]);

  return (
    <div className="board-card">
      <div className="board-card-content" onClick={handleNavigate}>
        <LayoutDashboard size={18} />
        <h3>{name}</h3>
      </div>

      {isOwner && (
        <div className="board-card-actions-wrapper" ref={actionsRef}>
          <button
            className="board-card-actions-icon"
            onClick={() => setShowActions((prev) => !prev)}
          >
            <MoreVertical size={18} />
          </button>

          {showActions && (
            <div className="board-card-popup">
              {/* <button onClick={() => onEdit?.(boardId)}>Edit</button> */}
              <button onClick={() => onDelete?.(boardId)}>Delete</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BoardCard;
