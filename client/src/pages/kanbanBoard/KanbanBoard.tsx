import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  TaskCard,
  CreateTaskModal,
  MemberModal,
  ActionLogModal,
} from '../../components';
import { taskApi } from '../../api/taskApi';
import { boardApi } from '../../api/boardApi';
import { useToast } from '../../components/toast/ToastProvider';
import { useAuthStore } from '../../store/authStore';
import { useTaskStore } from '../../store/taskStore';
import { socket } from '../../sockets';
import { ArrowLeft, Users, BarChart3, PlusCircle } from 'lucide-react';
import type { Task } from '../../types/task';

import './KanbanBoard.css';

interface Member {
  _id: string;
  name: string;
  email: string;
}

const KanbanBoard = () => {
  const { boardId } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const { user } = useAuthStore();
  const { tasks, setTasks, update } = useTaskStore();

  const [members, setMembers] = useState<Member[]>([]);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showMemberModal, setShowMemberModal] = useState(false);
  const [showActionLogModal, setShowActionLogModal] = useState(false);

  const fetchTasks = async () => {
    try {
      const res = await taskApi.getTasksByBoard(boardId!);
      setTasks(res.data);
    } catch (err: any) {
      toast.error(err.message || 'Failed to fetch tasks');
    }
  };

  const fetchMembers = async () => {
    try {
      const res = await boardApi.getMembersByBoard(boardId!);
      setMembers(res.data);
    } catch (err: any) {
      toast.error(err.message || 'Failed to fetch members');
    }
  };

  useEffect(() => {
    if (!boardId) return;

    socket.emit('join_board', boardId);
    socket.on('task_updated', update);
    socket.on('task_created', fetchTasks);

    return () => {
      socket.emit('leave_board', boardId);
      socket.off('task_updated');
      socket.off('task_created');
    };
  }, [boardId]);

  useEffect(() => {
    fetchTasks();
    fetchMembers();
  }, [boardId]);

  const handleDrop = async (taskId: string, newStatus: Task['status']) => {
    try {
      const payload =
        newStatus === 'todo'
          ? { status: newStatus, userId: null }
          : { status: newStatus, userId: user?._id };

      const res = await taskApi.updateTask(taskId, payload);
      update(res.data);
      socket.emit('task_updated', { boardId, task: res.data });
    } catch {
      toast.error('Failed to update task status');
    }
  };

  const onDragStart = (e: React.DragEvent, taskId: string) => {
    e.dataTransfer.setData('taskId', taskId);
  };

  const onDrop = (e: React.DragEvent, status: Task['status']) => {
    const taskId = e.dataTransfer.getData('taskId');
    handleDrop(taskId, status);
  };

  const onDragOver = (e: React.DragEvent) => e.preventDefault();

  const columns: { key: Task['status']; title: string }[] = [
    { key: 'todo', title: 'To Do' },
    { key: 'in progress', title: 'In Progress' },
    { key: 'done', title: 'Done' },
  ];

  return (
    <div className="kanban-board">
      <header className="kanban-header">
        <div className="kanban-header-left">
          <button className="close-btn-icon" onClick={() => navigate(-1)}>
            <ArrowLeft size={20} />
          </button>
          <h1 className="kanban-title-gradient">Kanban Board</h1>
        </div>
        <div className="kanban-actions">
          <button
            onClick={() => setShowMemberModal(true)}
            className="btn-secondary"
          >
            <Users className="w-5 h-5" />
            <span>Manage Members</span>
          </button>

          <button
            onClick={() => setShowActionLogModal(true)}
            className="btn-secondary"
          >
            <BarChart3 className="w-5 h-5" />
            <span>View Logs</span>
          </button>

          <button
            onClick={() => setShowTaskModal(true)}
            className="btn-primary"
          >
            <PlusCircle className="w-5 h-5" />
            <span>Create Task</span>
          </button>
        </div>
      </header>

      <hr className="kanban-divider" />

      <main className="kanban-columns">
        {columns.map((col) => (
          <section
            key={col.key}
            className="kanban-column"
            onDrop={(e) => onDrop(e, col.key)}
            onDragOver={onDragOver}
          >
            <h2>{col.title}</h2>
            {tasks
              .filter((task) => task.status === col.key)
              .map((task) => (
                <TaskCard
                  key={task._id}
                  task={task}
                  onDragStart={onDragStart}
                />
              ))}
          </section>
        ))}
      </main>

      {showTaskModal && (
        <CreateTaskModal
          boardId={boardId!}
          onClose={() => setShowTaskModal(false)}
          onCreate={fetchTasks}
        />
      )}
      {showMemberModal && (
        <MemberModal
          boardId={boardId!}
          members={members}
          onClose={() => setShowMemberModal(false)}
          onChange={fetchMembers}
        />
      )}
      {showActionLogModal && (
        <ActionLogModal
          boardId={boardId!}
          onClose={() => setShowActionLogModal(false)}
        />
      )}
    </div>
  );
};

export default KanbanBoard;
