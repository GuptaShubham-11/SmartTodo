import { useEffect, useState } from 'react';
import { boardApi } from '../../api/boardApi';
import './ActionLogModal.css';
import Loader from '../loader/Loader';
import { X } from 'lucide-react';

interface Log {
  _id: string;
  userId?: { name?: string };
  description: string;
  createdAt: string;
}

interface ActionLogModalProps {
  boardId: string;
  onClose: () => void;
}

const ActionLogModal = ({ boardId, onClose }: ActionLogModalProps) => {
  const [logs, setLogs] = useState<Log[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await boardApi.getActionLogs(boardId);
        setLogs(res.data || []);
      } catch (err) {
        // console.error('Error fetching logs:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, [boardId]);

  return (
    <div className="log-modal-backdrop" onClick={onClose}>
      <div
        className="log-modal"
        onClick={(e) => e.stopPropagation()} // Prevent backdrop close on modal click
      >
        <div className="log-modal-header">
          <h2>Action Logs</h2>
          <button
            className="log-close-btn"
            onClick={onClose}
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        {loading ? (
          <div className="log-loader-wrapper">
            <Loader />
          </div>
        ) : logs.length === 0 ? (
          <p className="empty-log">No actions found for this board.</p>
        ) : (
          <ul className="log-list">
            {logs.map((log) => (
              <li key={log._id}>
                <div className="log-main">
                  <span className="log-action">{log.description}</span>
                </div>
                <span className="log-time">
                  {new Date(log.createdAt).toLocaleString()}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ActionLogModal;
