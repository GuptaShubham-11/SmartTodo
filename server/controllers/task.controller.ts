import { ApiError } from '../utils/ApiError';
import { ApiResponse } from '../utils/ApiResponse';
import { asyncHandler } from '../utils/asyncHandler';
import Task from '../models/task.model';
import Board from '../models/board.model';
import ActionLog from '../models/actionlog.model';
import { AuthenticatedRequest } from '../middlewares/auth.middleware';
import User from '../models/user.model';

const createTask = asyncHandler(async (req: AuthenticatedRequest, res) => {
  if (!req.body) {
    throw new ApiError(400, 'Request data is missing.');
  }

  const { title, description, priority, assignedTo, boardId } = req.body;

  // Validate request body
  if (!title || !boardId || !priority || !description) {
    throw new ApiError(
      400,
      'Title, description, priority and boardId are required!'
    );
  }

  const board = await Board.findById(boardId);
  if (!board) {
    throw new ApiError(404, 'Board not found!');
  }

  const newTask = await Task.create({
    title,
    description,
    priority,
    assignedTo,
    boardId,
  });

  if (!newTask) {
    throw new ApiError(400, 'Task not created!');
  }

  // 🎯 Emit real-time update
  const io = req.app.locals.io;
  if (io) {
    io.to(newTask.boardId.toString()).emit('task_created', newTask);
  }

  const log = await ActionLog.create({
    boardId,
    userId: req.user?._id,
    actionType: 'CREATE_TASK',
    description: `Created task "${title}"`,
  });

  if (!log) {
    throw new ApiError(400, 'Action log not created!');
  }

  if (io) {
    io.to(log.boardId.toString()).emit('action_log_created', log);
  }

  res.status(200).json(new ApiResponse(200, 'Task created.', newTask));
});

const getTasksByBoard = asyncHandler(async (req, res) => {
  const { boardId } = req.params;
  if (!boardId) {
    throw new ApiError(400, 'Board id is required');
  }

  const tasks = await Task.find({ boardId }).populate(
    'assignedTo',
    'name email'
  );
  if (!tasks) {
    throw new ApiError(404, 'Tasks not found');
  }

  res.status(200).json(new ApiResponse(200, 'Tasks fetched.', tasks));
});

const updateTask = asyncHandler(async (req: AuthenticatedRequest, res) => {
  if (!req.body) {
    throw new ApiError(400, 'Request data is missing.');
  }

  const { taskId } = req.params;
  const updates = req.body;

  if (!taskId) {
    throw new ApiError(400, 'Task id is required');
  }

  const task = await Task.findByIdAndUpdate(taskId, updates, { new: true });
  if (!task) {
    throw new ApiError(404, 'Task not found');
  }

  // 🎯 Emit real-time update
  const io = req.app.locals.io;
  if (io) {
    io.to(task.boardId.toString()).emit('task_updated', task);
  }

  const log = await ActionLog.create({
    boardId: task.boardId,
    userId: req.user?._id,
    actionType: 'UPDATE_TASK',
    description: `Updated task "${task.title}"`,
  });

  if (!log) {
    throw new ApiError(400, 'Action log not created!');
  }

  if (io) {
    io.to(log.boardId.toString()).emit('action_log_updated', log);
  }

  res.status(200).json(new ApiResponse(200, 'Task updated.', task));
});

const deleteTask = asyncHandler(async (req: AuthenticatedRequest, res) => {
  const { taskId } = req.params;
  if (!taskId) {
    throw new ApiError(400, 'Task id is required');
  }

  const task = await Task.findByIdAndDelete(taskId);
  if (!task) {
    throw new ApiError(404, 'Task not found');
  }

  // 🎯 Emit real-time update
  const io = req.app.locals.io;
  if (io) {
    io.to(task.boardId.toString()).emit('task_deleted', task);
  }

  const log = await ActionLog.create({
    boardId: task.boardId,
    userId: req.user?._id,
    actionType: 'DELETE_TASK',
    description: `Deleted task "${task.title}"`,
  });

  if (!log) {
    throw new ApiError(400, 'Action log not created!');
  }

  if (io) {
    io.to(log.boardId.toString()).emit('action_log_deleted', log);
  }

  res.status(200).json(new ApiResponse(200, 'Task deleted.'));
});

const smartAssign = asyncHandler(async (req: AuthenticatedRequest, res) => {
  const { boardId, taskId } = req.params;
  if (!taskId) {
    throw new ApiError(400, 'Task ID is required');
  }

  if (!boardId) {
    throw new ApiError(400, 'Board ID is required');
  }

  const task = await Task.findById(taskId);
  if (!task) {
    throw new ApiError(404, 'Task not found');
  }

  // 1. Get all users in the board
  const board = await Board.find({ boardId }).populate(
    'members',
    '_id name email'
  );
  const users = board[0].members;

  // 2. For each user, count how many tasks they have assigned
  const userTaskCounts = await Promise.all(
    users.map(async (user) => {
      const count = await Task.countDocuments({
        assignedTo: user._id,
        boardId: task.boardId,
      });
      return { user, count };
    })
  );

  // 3. Find the user with the fewest tasks
  const sorted = userTaskCounts.sort((a, b) => a.count - b.count);
  const selectedUser = sorted[0]?.user;

  if (!selectedUser) {
    throw new ApiError(404, 'No available users to assign task');
  }

  // 4. Assign the task
  task.assignedTo = selectedUser._id;
  await task.save();

  // 5. Emit real-time update
  const io = req.app.locals.io;
  if (io) {
    io.to(task.boardId.toString()).emit('task_assigned', task);
  }

  // 6. Log the action
  await ActionLog.create({
    boardId: task.boardId,
    userId: req.user?._id,
    actionType: 'SMART_ASSIGN_TASK',
    description: `Smart assigned task "${task.title}" to ${selectedUser._id}`,
  });

  res
    .status(200)
    .json(new ApiResponse(200, `Task assigned to ${selectedUser._id}`, task));
});

export const taskController = {
  createTask,
  getTasksByBoard,
  updateTask,
  deleteTask,
  smartAssign,
};
