import './TaskDetailModal.css';
import { useEffect, useState } from 'react';
import UpdateTaskModal from './UpdateTaskModal';
import AssignTaskModal from './AssignTaskModal';
import { taskApi } from '../../api/taskApi';
import { useToast } from '../toast/ToastProvider';
import Loader from '../loader/Loader';
import { useTaskStore } from '../../store/taskStore';
import type { Task } from '../../types/task';
import ModalPortal from './ModalPortal';

interface Props {
  task: Task;
  onClose: () => void;
  onTaskChange?: () => void;
}

const TaskDetailModal = ({ task, onClose, onTaskChange }: Props) => {
  const isTodo = task.status === 'todo';
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const { update, remove } = useTaskStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  const handleUpdate = async (updatedTask: Partial<Task>) => {
    try {
      setIsLoading(true);
      const res = await taskApi.updateTask(task._id, updatedTask);
      update(res.data);
      toast.success('Task updated.');
      onTaskChange?.();
    } catch (error: any) {
      toast.error(error.message || 'Failed to update task.');
    } finally {
      setIsLoading(false);
      setShowUpdateModal(false);
    }
  };

  const handleAssign = async (userId: string) => {
    try {
      setIsLoading(true);
      const res = await taskApi.assignTask(task._id, userId);
      update(res.data);
      toast.success('Task assigned.');
      onTaskChange?.();
    } catch (error: any) {
      toast.error(error.message || 'Failed to assign task.');
    } finally {
      setIsLoading(false);
      setShowAssignModal(false);
    }
  };

  const handleSmartAssign = async () => {
    try {
      setIsLoading(true);
      const res = await taskApi.smartAssign(task.boardId, task._id);
      update(res.data);
      toast.success('Smart assign complete.');
      onTaskChange?.();
    } catch (error: any) {
      toast.error(error.message || 'Failed to smart assign.');
    } finally {
      setIsLoading(false);
      onClose();
    }
  };

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      await taskApi.deleteTask(task._id);
      remove(task._id);
      toast.success('Task deleted.');
      onTaskChange?.();
      onClose();
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete task.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ModalPortal>
      <div
        className="task-detail-modal__backdrop"
        role="dialog"
        aria-modal="true"
        onClick={handleBackdropClick}
      >
        <div className="task-detail-modal">
          <div className="task-detail-modal__header">
            <h2>{task.title}</h2>
            <button className="task-detail-modal__close-btn" onClick={onClose}>
              ✕
            </button>
          </div>

          {isLoading ? (
            <div className="task-detail-modal__loader">
              <Loader />
            </div>
          ) : (
            <>
              <p>
                <strong>Description:</strong> {task.description}
              </p>
              <p>
                <strong>Priority:</strong> {task.priority}
              </p>
              <p>
                <strong>Status:</strong> {task.status}
              </p>
              <p>
                <strong>Assigned To:</strong>{' '}
                {task.assignedTo?.name || 'Not assigned'}
              </p>

              {isTodo && (
                <div className="task-detail-modal__actions">
                  <button
                    className="btn-primary"
                    onClick={() => setShowUpdateModal(true)}
                  >
                    Update
                  </button>
                  <button
                    className="btn-secondary"
                    onClick={() => setShowAssignModal(true)}
                  >
                    Assign
                  </button>
                  <button className="btn-smart" onClick={handleSmartAssign}>
                    Smart Assign
                  </button>
                  <button className="btn-remove" onClick={handleDelete}>
                    Delete
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {showUpdateModal && (
        <UpdateTaskModal
          task={task}
          onClose={() => setShowUpdateModal(false)}
          onSubmit={handleUpdate}
          isLoading={isLoading}
        />
      )}

      {showAssignModal && (
        <AssignTaskModal
          boardId={task.boardId}
          onClose={() => setShowAssignModal(false)}
          onAssign={handleAssign}
          isLoading={isLoading}
        />
      )}
    </ModalPortal>
  );
};

export default TaskDetailModal;
