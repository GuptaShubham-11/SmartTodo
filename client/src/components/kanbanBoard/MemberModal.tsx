import { Plus, X } from 'lucide-react';
import './MemberModal.css';
import { useToast } from '../toast/ToastProvider';
import { boardApi } from '../../api/boardApi';
import { useState } from 'react';
import Loader from '../loader/Loader';
import AddMemberModal from './AddMemberModal';

const MemberModal = ({ boardId, members, onClose, onChange }: any) => {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  const handleRemove = async (memberId: string) => {
    try {
      setIsLoading(true);
      await boardApi.removeMemberFromBoard(boardId, { userId: memberId });
      toast.success('Member removed.');
    } catch (error: any) {
      // console.error('Error removing member', error);
      toast.error(error.message || 'Failed to remove member.');
    } finally {
      setIsLoading(false);
      onChange();
    }
  };

  return (
    <>
      <div className="member-modal-backdrop">
        <div className="member-modal">
          <div className="member-modal-header">
            <h2>Manage Members</h2>
            <button
              className="member-modal-btn-icon"
              onClick={() => setShowAddModal(true)}
              title="Add Member"
              aria-label="Add Member"
            >
              <Plus />
            </button>
          </div>

          {members.length === 0 && (
            <p className="member-modal-no-members">No members yet.</p>
          )}

          {members.map((member: any) => (
            <div key={member._id} className="member-modal-row">
              <div className="member-modal-info">
                <h4>{member.name}</h4>
                <p>{member.email}</p>
              </div>
              <button
                className="member-modal-btn-remove"
                onClick={() => handleRemove(member._id)}
                title="Remove Member"
              >
                <X size={18} />
              </button>
            </div>
          ))}

          <div className="member-modal-actions">
            <button className="member-modal-btn-close" onClick={onClose}>
              {isLoading ? <Loader /> : 'Close'}
            </button>
          </div>
        </div>
      </div>

      {showAddModal && (
        <AddMemberModal
          boardId={boardId}
          onClose={() => setShowAddModal(false)}
          onAdded={onChange}
        />
      )}
    </>
  );
};

export default MemberModal;
