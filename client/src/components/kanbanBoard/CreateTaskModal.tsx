import { useState } from 'react';
import './CreateTaskModal.css';
import { taskApi } from '../../api/taskApi';
import { useToast } from '../toast/ToastProvider';
import Loader from '../loader/Loader';
import { X } from 'lucide-react';

// TODO: After this add socket logic on board and actionlog

interface CreateTaskModalProps {
  boardId: string;
  onClose: () => void;
  onCreate: () => void;
}

const CreateTaskModal = ({
  boardId,
  onClose,
  onCreate,
}: CreateTaskModalProps) => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [isLoading, setIsLoading] = useState(false);

  const toast = useToast();

  const handleCreate = async () => {
    if (!title.trim()) {
      toast.error('Task title is required');
      return;
    }

    try {
      setIsLoading(true);
      await taskApi.createTask({
        title,
        description: desc,
        priority,
        boardId,
      });
      toast.success('Task created.');
      onCreate();
      onClose();
    } catch (error: any) {
      // console.error('Error creating task:', error);
      toast.error(error.message || 'Failed to create task.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="create-task-modal-backdrop">
      <div className="create-task-modal">
        <button
          className="create-task-modal-close"
          onClick={onClose}
          aria-label="Close Modal"
        >
          <X size={20} />
        </button>

        <h2 className="create-task-modal-title">Create New Task</h2>

        <input
          className="create-task-modal-input"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="create-task-modal-textarea"
          placeholder="Description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />

        <select
          className="create-task-modal-select"
          value={priority}
          onChange={(e) =>
            setPriority(e.target.value as 'low' | 'medium' | 'high')
          }
        >
          <option value="high">High </option>
          <option value="medium">Medium </option>
          <option value="low">Low </option>
        </select>

        <div className="create-task-modal-actions">
          <button
            className="create-task-modal-btn-primary"
            disabled={isLoading || !title.trim()}
            onClick={handleCreate}
          >
            {isLoading ? <Loader /> : 'Create'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateTaskModal;
