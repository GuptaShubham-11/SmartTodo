import { useEffect, useState } from 'react';
import {
  GroupCard,
  CreateGroupModal,
  GroupMemberModal,
  Loader,
} from '../../components';
import './Group.css';
import { Plus } from 'lucide-react';
import { useToast } from '../../components/toast/ToastProvider';
import { groupApi } from '../../api/groupApi';
import { useAuthStore } from '../../store/authStore';

const Group = () => {
  const [groups, setGroups] = useState<any[]>([]);
  const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const { user } = useAuthStore();

  const fetchGroups = async () => {
    try {
      setIsLoading(true);
      const res = await groupApi.getUserGroups();
      setGroups(res.data || []);
    } catch (err: any) {
      // console.error('Failed to fetch groups', err);
      toast.error(err.message || 'Failed to fetch groups');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateGroup = async (name: string) => {
    try {
      setIsLoading(true);
      await groupApi.createGroup({ name });
      toast.success('Group created.');
      setModalOpen(false);
      fetchGroups();
    } catch (err: any) {
      // console.error('Group creation failed', err);
      toast.error(err.message || 'Failed to create!');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  return (
    <div className="groups-page">
      <div className="groups-header">
        <h1>Your Groups</h1>
        <button
          className="create-group-btn"
          onClick={() => setModalOpen(true)}
          title="Create Group"
        >
          <Plus size={18} />
          <span className="btn-text">Create</span>
        </button>
      </div>

      {isLoading ? (
        <div className="groups-loader-wrapper">
          <Loader />
        </div>
      ) : (
        <div className="groups-grid">
          {groups.length > 0 ? (
            groups.map((group) => (
              <div key={group._id} className="group-card-wrapper">
                <GroupCard
                  id={group._id}
                  name={group.name}
                  owner={group.owner?.name || 'Unknown'}
                  createdAt={group.createdAt}
                  members={group.members}
                />
                {group.owner._id === user?._id && (
                  <button
                    className="menage-members-btn"
                    onClick={() => setSelectedGroupId(group._id)}
                  >
                    Members
                  </button>
                )}
              </div>
            ))
          ) : (
            <p className="groups-empty">No groups found. Create one!</p>
          )}
        </div>
      )}

      {selectedGroupId && (
        <GroupMemberModal
          groupId={selectedGroupId}
          isOpen={!!selectedGroupId}
          onClose={() => setSelectedGroupId(null)}
        />
      )}

      <CreateGroupModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onCreate={handleCreateGroup}
        isLoading={isLoading}
      />
    </div>
  );
};

export default Group;
