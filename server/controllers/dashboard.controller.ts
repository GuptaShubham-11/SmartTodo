import { asyncHandler } from '../utils/asyncHandler';
import { AuthenticatedRequest } from '../middlewares/auth.middleware';
import Group from '../models/group.model';
import Board from '../models/board.model';
import Task from '../models/task.model';
import { ApiResponse } from '../utils/ApiResponse';
import { ApiError } from '../utils/ApiError';

const getDashboardOverview = asyncHandler(
  async (req: AuthenticatedRequest, res) => {
    const userId = req.user?._id;
    if (!userId) throw new ApiError(400, 'User ID is required');

    const [totalGroups, totalBoards, completedTasks, pendingTasks] =
      await Promise.all([
        Group.countDocuments({ members: userId }),
        Board.countDocuments({ members: userId }),
        Task.countDocuments({ assignedTo: userId, status: 'done' }),
        Task.countDocuments({ assignedTo: userId, status: { $ne: 'done' } }),
      ]);

    res.status(200).json(
      new ApiResponse(200, 'User dashboard overview fetched successfully.', {
        totalGroups,
        totalBoards,
        completedTasks,
        pendingTasks,
      })
    );
  }
);

const getTaskStatusRatio = asyncHandler(
  async (req: AuthenticatedRequest, res) => {
    const userId = req.user?._id;

    const boards = await Board.find({ members: userId }, '_id');
    const boardIds = boards.map((board) => board._id);

    const [todo, inProgress, done] = await Promise.all([
      Task.countDocuments({
        boardId: { $in: boardIds },
        assignedTo: null,
        status: 'todo',
      }),
      Task.countDocuments({ assignedTo: userId, status: 'in progress' }),
      Task.countDocuments({ assignedTo: userId, status: 'done' }),
    ]);

    res.status(200).json(
      new ApiResponse(200, 'Task status ratio fetched successfully.', {
        todo,
        inProgress,
        done,
      })
    );
  }
);

const getUserActivity = asyncHandler(async (req: AuthenticatedRequest, res) => {
  const userId = req.user?._id;
  const today = new Date();
  const days = 7;
  const data = [];

  for (let i = 0; i < days; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);

    const start = new Date(date.setHours(0, 0, 0, 0));
    const end = new Date(date.setHours(23, 59, 59, 999));

    const [tasksCreated, tasksCompleted] = await Promise.all([
      Task.countDocuments({
        assignedTo: userId,
        createdAt: { $gte: start, $lte: end },
      }),
      Task.countDocuments({
        assignedTo: userId,
        status: 'done',
        updatedAt: { $gte: start, $lte: end },
      }),
    ]);

    const day = String(start.getDate()).padStart(2, '0');

    data.unshift({
      date: day,
      tasksCreated,
      tasksCompleted,
    });
  }

  res
    .status(200)
    .json(
      new ApiResponse(200, 'User activity stats fetched successfully.', data)
    );
});

const getPopularBoards = asyncHandler(
  async (req: AuthenticatedRequest, res) => {
    const userId = req.user?._id;

    // First, get user's board IDs
    const userBoards = await Board.find({ members: userId }, '_id');
    const boardIds = userBoards.map((board) => board._id);

    const boards = await Task.aggregate([
      { $match: { boardId: { $in: boardIds } } },
      {
        $group: {
          _id: '$boardId',
          taskCount: { $sum: 1 },
        },
      },
      { $sort: { taskCount: -1 } },
      { $limit: 5 },
      {
        $lookup: {
          from: 'boards',
          localField: '_id',
          foreignField: '_id',
          as: 'board',
        },
      },
      { $unwind: '$board' },
      {
        $project: {
          boardName: '$board.name',
          taskCount: 1,
        },
      },
    ]);

    res
      .status(200)
      .json(
        new ApiResponse(200, 'Popular boards fetched successfully.', boards)
      );
  }
);

export const dashboardController = {
  getDashboardOverview,
  getTaskStatusRatio,
  getUserActivity,
  getPopularBoards,
};
