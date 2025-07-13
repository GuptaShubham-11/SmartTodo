import { useState } from 'react';
import Loader from '../loader/Loader';
import './UpdateTaskModal.css';

interface Task {
  _id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  [key: string]: any;
}

interface UpdateTaskProps {
  task: Task;
  onClose: () => void;
  onSubmit: (updatedTask: Task) => void;
  isLoading: boolean;
}

const UpdateTaskModal = ({
  task,
  onClose,
  onSubmit,
  isLoading,
}: UpdateTaskProps) => {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [priority, setPriority] = useState<Task['priority']>(task.priority);

  const handleSubmit = () => {
    if (!title.trim() || !description.trim()) return;
    onSubmit({ ...task, title, description, priority });
    onClose();
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div className="update-task__backdrop" onClick={handleBackdropClick}>
      <div className="update-task__modal">
        <h3 className="update-task__title">Update Task</h3>

        <input
          className="update-task__input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task Title"
        />

        <textarea
          className="update-task__textarea"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          rows={4}
        />

        <select
          className="update-task__select"
          value={priority}
          onChange={(e) => setPriority(e.target.value as Task['priority'])}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <div className="update-task__actions">
          <button
            className="update-task__btn update-task__btn--primary"
            disabled={isLoading || !title.trim() || !description.trim()}
            onClick={handleSubmit}
          >
            {isLoading ? <Loader /> : 'Update'}
          </button>
          <button
            className="update-task__btn update-task__btn--secondary"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateTaskModal;
