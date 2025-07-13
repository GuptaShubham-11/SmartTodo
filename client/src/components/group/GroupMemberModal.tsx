import { useEffect, useRef, useState, useCallback } from 'react';
import './GroupMemberModal.css';
import { groupApi } from '../../api/groupApi';
import { useToast } from '../toast/ToastProvider';
import { X } from 'lucide-react';
import Loader from '../loader/Loader';

interface Props {
  groupId: string;
  isOpen: boolean;
  onClose: () => void;
}

interface Member {
  _id: string;
  name: string;
  email: string;
}

const GroupMemberModal = ({ groupId, isOpen, onClose }: Props) => {
  const [members, setMembers] = useState<Member[]>([]);
  const [userId, setUserId] = useState('');
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const fetchMembers = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await groupApi.getGroupById(groupId);
      setMembers(res.data?.members || []);
    } catch (err: any) {
      toast.error(err.message || 'Failed to fetch members');
    } finally {
      setIsLoading(false);
    }
  }, [groupId, toast]);

  const handleAddMember = async () => {
    if (!userId.trim()) return;

    if (members.some((m) => m._id === userId.trim())) {
      toast.error('User is already a member!');
      return;
    }

    try {
      setIsAdding(true);
      await groupApi.addMemberToGroup(groupId, userId.trim());
      toast.success('Member added!');
      setUserId('');
      fetchMembers();
    } catch (err: any) {
      toast.error(err.message || 'Failed to add member');
    } finally {
      setIsAdding(false);
    }
  };

  const handleRemoveMember = async (memberId: string) => {
    try {
      setIsRemoving(true);
      await groupApi.removeMemberFromGroup(groupId, memberId);
      toast.success('Member removed!');
      fetchMembers();
    } catch (err: any) {
      toast.error(err.message || 'Failed to remove member');
    } finally {
      setIsRemoving(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchMembers();
      setTimeout(() => inputRef.current?.focus(), 100); // auto-focus input
    }
  }, [isOpen, fetchMembers]);

  // Close modal on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        (e.target as HTMLElement).classList.contains('group-modal-backdrop')
      ) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="group-modal-backdrop">
      <div className="group-modal">
        <div className="group-modal-header">
          <h2>Group Members</h2>
          <button
            onClick={onClose}
            className="group-modal-close-btn"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        <div className="group-member-input">
          <input
            type="text"
            placeholder="Enter userId to add"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            ref={inputRef}
          />
          <button
            onClick={handleAddMember}
            disabled={isAdding || !userId.trim()}
          >
            {isAdding ? <Loader /> : 'Add'}
          </button>
        </div>

        <ul className="group-member-list">
          {members.map((member) => (
            <li key={member._id}>
              <span>
                {member.name} ({member.email})
              </span>
              <button
                onClick={() => handleRemoveMember(member._id)}
                disabled={isRemoving}
              >
                {isRemoving ? <Loader /> : 'Remove'}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default GroupMemberModal;
