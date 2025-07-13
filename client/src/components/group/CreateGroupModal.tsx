import type { FC } from 'react';
import { useState } from 'react';
import { X } from 'lucide-react';
import './CreateGroupModal.css';
import Loader from '../loader/Loader';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (name: string) => void;
  isLoading: boolean;
}

const CreateGroupModal: FC<ModalProps> = ({
  isOpen,
  onClose,
  onCreate,
  isLoading,
}) => {
  const [name, setName] = useState('');

  const handleSubmit = () => {
    if (name.trim()) {
      onCreate(name);
      setName('');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="create-group-modal-backdrop">
      <div className="create-group-modal">
        <div className="create-group-modal-header">
          <h2 className="create-group-title">Create New Group</h2>
          <button
            onClick={onClose}
            className="create-group-close-btn"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>
        <input
          type="text"
          placeholder="Enter group name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="create-group-input"
          aria-label="Group Name"
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSubmit();
          }}
        />
        <button
          className="create-group-submit-btn"
          onClick={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? <Loader /> : 'Create Group'}
        </button>
      </div>
    </div>
  );
};

export default CreateGroupModal;
