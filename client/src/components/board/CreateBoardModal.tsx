import React, { useEffect, useState } from 'react';
import './CreateBoardModal.css';
import { boardApi } from '../../api/boardApi';
import { X } from 'lucide-react';
import { useToast } from '../toast/ToastProvider';
import Loader from '../loader/Loader';

interface Props {
  groupId: string;
  onClose: () => void;
  onBoardCreated: () => void;
}

const CreateBoardModal: React.FC<Props> = ({
  groupId,
  onClose,
  onBoardCreated,
}) => {
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await boardApi.createBoard({ name, groupId });
      toast.success('Board created.');
      setName('');
      onBoardCreated();
      onClose();
    } catch (err: any) {
      console.error('Failed to create board', err);
      toast.error(err.message || 'Failed to create board');
    } finally {
      setIsLoading(false);
    }
  };

  // Allow Escape key to close modal
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose]);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Create Board</h2>
          <button onClick={onClose} className="modal-close-btn">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <input
            autoFocus
            type="text"
            placeholder="Board Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <button
            disabled={isLoading}
            className="modal-submit-btn"
            type="submit"
          >
            {isLoading ? <Loader /> : 'Create Board'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateBoardModal;
