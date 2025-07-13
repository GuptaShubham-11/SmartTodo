import './TaskCard.css';
import { useState } from 'react';
import TaskDetailModal from './TaskDetailModal';
import type { Task } from '../../types/task';

interface TaskCardProps {
  task: Task;
  onDragStart: (e: React.DragEvent<HTMLDivElement>, taskId: string) => void;
}

const TaskCard = ({ task, onDragStart }: TaskCardProps) => {
  const [showModal, setShowModal] = useState(false);

  const getPriorityColor = () => {
    switch (task.priority.toLowerCase()) {
      case 'high':
        return 'task-card__priority task-card__priority--high';
      case 'medium':
        return 'task-card__priority task-card__priority--medium';
      case 'low':
        return 'task-card__priority task-card__priority--low';
      default:
        return 'task-card__priority';
    }
  };

  return (
    <>
      <div
        className="task-card"
        draggable
        onDragStart={(e) => onDragStart(e, task._id)}
        onClick={() => setShowModal(true)}
        title="Click to view task details"
      >
        <p className="task-card__title">{task.title}</p>
        <span className={getPriorityColor()}>
          {task.priority.toUpperCase()}
        </span>
      </div>

      {showModal && (
        <TaskDetailModal task={task} onClose={() => setShowModal(false)} />
      )}
    </>
  );
};

export default TaskCard;
