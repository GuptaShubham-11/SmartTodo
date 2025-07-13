import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { BoardCard, CreateBoardModal, Loader } from '../../components';
import './Board.css';
import { boardApi } from '../../api/boardApi';
import { useToast } from '../../components/toast/ToastProvider';
import { ArrowLeft, Plus } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

interface Board {
  _id: string;
  name: string;
  createdBy: {
    _id: string;
    name: string;
    email: string;
  };
  members: string[];
}

const Board = () => {
  const { groupId } = useParams();
  const navigate = useNavigate();
  const [boards, setBoards] = useState<Board[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const { user } = useAuthStore();

  const fetchBoards = async () => {
    try {
      setIsLoading(true);
      const res = await boardApi.getBoardsByGroupId(groupId!);
      setBoards(res.data);
    } catch (err: any) {
      console.error('Failed to fetch boards');
      toast.error(err.message || 'Failed to fetch boards');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (boardId: string) => {
    try {
      setIsLoading(true);
      await boardApi.deleteBoard(boardId);
      toast.success('Board deleted.');
      fetchBoards();
    } catch (err: any) {
      console.error('Failed to delete board');
      toast.error(err.message || 'Failed to delete board');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (groupId) fetchBoards();
  }, [groupId]);

  if (!user) {
    return (
      <p className="no-boards-text">You must be logged in to view boards.</p>
    );
  }

  const accessibleBoards = user
    ? boards.filter((board, idx) => {
        const isMember = board.members.some((member) => {
          if (typeof member === 'string') return member === user?._id;
        });

        const isOwner = board.createdBy._id === user._id;
        console.log(idx, 'isMember', isMember, 'isOwner', isOwner);
        return isMember || isOwner;
      })
    : [];

  console.log(
    'accessibleBoards',
    accessibleBoards,
    'boards',
    boards,
    'user',
    user
  );

  return (
    <div className="boards-page">
      <div className="boards-header-wrapper">
        <div className="boards-header">
          <button className="boards-back" onClick={() => navigate(-1)}>
            <ArrowLeft size={20} />
          </button>
          <h2 className="boards-heading">
            <span className="gradient-text">Boards</span>
          </h2>
        </div>

        <button
          className="boards-create-btn"
          onClick={() => setShowModal(true)}
        >
          <Plus className="create-icon" />
          <span className="create-text">Create</span>
        </button>
      </div>

      <hr style={{ borderColor: 'var(--surface)', marginBottom: '1.5rem' }} />

      {isLoading ? (
        <div className="boards-loader-container">
          <Loader />
        </div>
      ) : (
        <div className="boards-list">
          {accessibleBoards.length > 0 ? (
            accessibleBoards.map((board) => (
              <BoardCard
                key={board._id}
                groupId={groupId!}
                boardId={board._id}
                name={board.name}
                onEdit={() =>
                  navigate(`/groups/${groupId}/boards/${board._id}`)
                }
                onDelete={handleDelete}
                isOwner={String(board.createdBy._id) === String(user?._id)}
              />
            ))
          ) : (
            <p className="no-boards-text">
              No boards. Join a group to see boards OR create a new one.
            </p>
          )}
        </div>
      )}

      {showModal && (
        <CreateBoardModal
          groupId={groupId!}
          onClose={() => setShowModal(false)}
          onBoardCreated={fetchBoards}
        />
      )}
    </div>
  );
};

export default Board;
