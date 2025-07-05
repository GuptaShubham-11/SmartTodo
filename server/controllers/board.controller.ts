import { ApiError } from '../utils/ApiError';
import { ApiResponse } from '../utils/ApiResponse';
import { asyncHandler } from '../utils/asyncHandler';
import Board from '../models/board.model';
import Group from '../models/group.model';
import { AuthenticatedRequest } from '../middlewares/auth.middleware';

const createBoard = asyncHandler(async (req: AuthenticatedRequest, res) => {
  if (!req.body) {
    throw new ApiError(400, 'Request data is missing.');
  }

  const { name, groupId } = req.body;
  if (!name || !groupId) {
    throw new ApiError(400, 'Name and groupId is required!');
  }

  const userId = req.user?._id;
  if (!userId) {
    throw new ApiError(400, 'User not found');
  }

  // Check if group not exists
  const groupExists = await Group.findById(groupId);
  if (!groupExists) {
    throw new ApiError(404, 'Group not found');
  }

  if (!groupExists.members.includes(userId)) {
    throw new ApiError(403, 'You are not a member of this group');
  }

  const newBoard = await Board.create({
    name,
    groupId,
    createdBy: userId,
  });

  res.status(200).json(new ApiResponse(200, 'Board created.', newBoard));
});

const getBoardsByGroup = asyncHandler(
  async (req: AuthenticatedRequest, res) => {
    const { groupId } = req.params;
    if (!groupId) {
      throw new ApiError(400, 'Group id is required');
    }

    const boards = await Board.find({ groupId }).populate(
      'createdBy',
      'name email'
    );
    res.status(200).json(new ApiResponse(200, 'Boards fetched.', boards));
  }
);

const getBoardById = asyncHandler(async (req, res) => {
  const { boardId } = req.params;

  if (!boardId) {
    throw new ApiError(400, 'Board id is required');
  }

  const board = await Board.findById(boardId).populate(
    'createdBy',
    'name email'
  );
  if (!board) {
    throw new ApiError(404, 'Board not found');
  }

  res.status(200).json(new ApiResponse(200, 'Board fetched.', board));
});

const updateBoard = asyncHandler(async (req: AuthenticatedRequest, res) => {
  const { boardId } = req.params;
  const { name } = req.body;

  if (!boardId) {
    throw new ApiError(400, 'Board id is required');
  }

  if (!name) {
    throw new ApiError(400, 'Name is required');
  }

  const userId = req.user?._id;
  if (!userId) {
    throw new ApiError(400, 'User not found');
  }

  const board = await Board.findById(boardId);
  if (!board) {
    throw new ApiError(404, 'Board not found!');
  }

  if (board.createdBy.toString() !== userId.toString()) {
    throw new ApiError(403, 'Not authorized to edit this board!');
  }

  board.name = name || board.name;
  await board.save();

  res.status(200).json(new ApiResponse(200, 'Board updated.', board));
});

const deleteBoard = asyncHandler(async (req: AuthenticatedRequest, res) => {
  const { boardId } = req.params;

  if (!boardId) {
    throw new ApiError(400, 'Board id is required');
  }

  const userId = req.user?._id;
  if (!userId) {
    throw new ApiError(400, 'User not found');
  }

  const board = await Board.findById(boardId);
  if (!board) {
    throw new ApiError(404, 'Board not found!');
  }

  if (board.createdBy.toString() !== userId.toString()) {
    throw new ApiError(403, 'Not authorized to delete this board!');
  }

  await Board.findByIdAndDelete(boardId);

  res.status(200).json(new ApiResponse(200, 'Board deleted.'));
});

export const boardController = {
  createBoard,
  getBoardsByGroup,
  getBoardById,
  updateBoard,
  deleteBoard,
};
