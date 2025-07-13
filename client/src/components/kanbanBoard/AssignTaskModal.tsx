import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { boardApi } from '../../api/boardApi';
import { useToast } from '../toast/ToastProvider';
import Loader from '../loader/Loader';
import './AssignTaskModal.css';

interface Member {
  _id: string;
  name: string;
  email: string;
}

interface Props {
  boardId: string;
  onClose: () => void;
  onAssign: (userId: string) => void;
  isLoading: boolean;
}

const AssignTaskModal = ({ boardId, onClose, onAssign, isLoading }: Props) => {
  const [members, setMembers] = useState<Member[]>([]);
  const [selectedUserId, setSelectedUserId] = useState('');
  const toast = useToast();

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const res = await boardApi.getMembersByBoard(boardId);
        setMembers(res.data || []);
      } catch (err: any) {
        toast.error(err.message || 'Failed to fetch members');
      }
    };
    fetchMembers();
  }, [boardId]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleAssign = () => {
    if (selectedUserId) {
      onAssign(selectedUserId);
      onClose();
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal assign-task-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="assign-task-header">
          <h3>Assign Task</h3>
          <button
            className="assign-task-close"
            onClick={onClose}
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        {isLoading ? (
          <div className="modal-loader">
            <Loader />
            <p>Loading members...</p>
          </div>
        ) : members.length === 0 ? (
          <p className="no-members">No members available to assign.</p>
        ) : (
          <>
            <select
              value={selectedUserId}
              onChange={(e) => setSelectedUserId(e.target.value)}
              className="assign-select"
            >
              <option value="">-- Select Member --</option>
              {members.map((member) => (
                <option key={member._id} value={member._id}>
                  {member.name} ({member.email})
                </option>
              ))}
            </select>

            <button
              className="assign-task-btn-primary"
              onClick={handleAssign}
              disabled={!selectedUserId || isLoading}
            >
              {isLoading ? <Loader /> : 'Assign'}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default AssignTaskModal;
