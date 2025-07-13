import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import { dashboardApi } from '../../api/dashboardApi';
import { useToast } from '../../components/toast/ToastProvider';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import {
  ListTodo,
  ListChecks,
  LoaderCircle,
  BarChart3,
  Flame,
  SquareChartGantt,
} from 'lucide-react';
import { Loader } from '../../components';

interface OverviewStats {
  totalGroups: number;
  totalBoards: number;
  totalTasks: number;
  completedTasks: number;
  pendingTasks: number;
}

interface TaskRatio {
  todo: number;
  inProgress: number;
  done: number;
}

interface ActivityDay {
  date: string;
  tasksCreated: number;
  tasksCompleted: number;
}

interface PopularBoard {
  boardName: string;
  taskCount: number;
}

const COLORS = ['#f39c12', '#3498db', '#2ecc71'];

const Dashboard: React.FC = () => {
  const [overview, setOverview] = useState<OverviewStats | null>(null);
  const [statusRatio, setStatusRatio] = useState<TaskRatio | null>(null);
  const [activity, setActivity] = useState<ActivityDay[]>([]);
  const [popularBoards, setPopularBoards] = useState<PopularBoard[]>([]);
  const toast = useToast();
  const [loading, setLoading] = useState(true);
  console.log(statusRatio);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [overview, activity, taskRatio, popularBoards] =
          await Promise.all([
            dashboardApi.getDashboardData(),
            dashboardApi.getUserActivity(),
            dashboardApi.getTaskStatusRatio(),
            dashboardApi.getPopularBoards(),
          ]);

        setOverview(overview.data);
        setStatusRatio(taskRatio.data);
        setActivity(activity.data);
        setPopularBoards(popularBoards.data);
      } catch (error: any) {
        console.error('Error fetching dashboard data:', error);
        toast.error(error.message || 'Failed to fetch dashboard data.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="dashboard">
      <h2 className="dashboard-title">
        <SquareChartGantt size={28} /> Dashboard Overview
      </h2>

      {overview && (
        <div className="overview-grid">
          <div className="overview-card">
            <ListTodo /> Groups <span>{overview.totalGroups}</span>
          </div>
          <div className="overview-card">
            <BarChart3 /> Boards <span>{overview.totalBoards}</span>
          </div>
          <div className="overview-card">
            <ListChecks /> Completed <span>{overview.completedTasks}</span>
          </div>
          <div className="overview-card">
            <LoaderCircle /> Pending <span>{overview.pendingTasks}</span>
          </div>
        </div>
      )}

      {/* Task Ratio Chart */}
      {statusRatio && (
        <div className="dashboard-section">
          <h3>
            <BarChart3 /> Task Status Ratio
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            {statusRatio.todo || statusRatio.inProgress || statusRatio.done ? (
              <PieChart>
                <Pie
                  data={[
                    { name: 'To Do', value: statusRatio.todo },
                    { name: 'In Progress', value: statusRatio.inProgress },
                    { name: 'Done', value: statusRatio.done },
                  ]}
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  label
                  dataKey="value"
                >
                  {COLORS.map((color, index) => (
                    <Cell key={index} fill={color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            ) : (
              <p className="no-data">No tasks found.</p>
            )}
          </ResponsiveContainer>
        </div>
      )}

      {/* User Activity Chart */}
      <div className="dashboard-section">
        <h3>
          <BarChart3 /> Activity (Last 7 Days)
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={activity}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="tasksCreated" fill="#f39c12" name="Created" />
            <Bar dataKey="tasksCompleted" fill="#2ecc71" name="Completed" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Popular Boards */}
      <div className="dashboard-section">
        <h3>
          <Flame /> Popular Boards
        </h3>
        <ul className="popular-list">
          {popularBoards.map((board, idx) => (
            <li key={idx}>
              {board.boardName} — <strong>{board.taskCount}</strong> tasks
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
