import './AddMemberModal.css';
import { useState } from 'react';
import { useToast } from '../toast/ToastProvider';
import { boardApi } from '../../api/boardApi';
import Loader from '../loader/Loader';
import { X } from 'lucide-react';

const AddMemberModal = ({ boardId, onClose, onAdded }: any) => {
  const [userId, setUserId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const handleAdd = async () => {
    if (!userId.trim()) return;

    try {
      setIsLoading(true);
      await boardApi.addMemberToBoard(boardId, { userId });
      toast.success('Member added.');
      onAdded();
      onClose();
    } catch (error: any) {
      toast.error(error.message || 'Failed to add member.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="add-member-backdrop" onClick={onClose}>
      <div className="add-member-modal" onClick={(e) => e.stopPropagation()}>
        <div className="add-member-header">
          <h3>Add Member</h3>
          <button
            className="add-member-close"
            onClick={onClose}
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        <input
          type="text"
          placeholder="Enter User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />

        <div className="add-member-actions">
          <button
            className="add-member-btn"
            onClick={handleAdd}
            disabled={isLoading}
          >
            {isLoading ? <Loader /> : 'Add'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddMemberModal;
