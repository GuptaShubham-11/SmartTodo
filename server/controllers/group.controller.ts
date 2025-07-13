import { ApiError } from '../utils/ApiError';
import { ApiResponse } from '../utils/ApiResponse';
import { asyncHandler } from '../utils/asyncHandler';
import Group from '../models/group.model';
import { AuthenticatedRequest } from '../middlewares/auth.middleware';
import User from '../models/user.model';

const createGroup = asyncHandler(async (req: AuthenticatedRequest, res) => {
  if (!req.body) {
    throw new ApiError(400, 'Request data is missing.');
  }

  const { name } = req.body;
  const ownerId = req.user?._id;

  // Validate request body
  if (!name || !ownerId) {
    throw new ApiError(400, 'Name and ownerId is required!');
  }

  const newGroup = await Group.create({
    name,
    owner: ownerId,
    members: [ownerId],
  });

  if (!newGroup) {
    throw new ApiError(400, 'Group not created!');
  }

  await User.findByIdAndUpdate(ownerId, {
    $addToSet: { groups: newGroup._id },
  });

  res
    .status(200)
    .json(new ApiResponse(201, 'Group created successfully.', newGroup));
});

const getUserGroups = asyncHandler(async (req: AuthenticatedRequest, res) => {
  const userId = req.user?._id;

  if (!userId) {
    throw new ApiError(400, 'User id is required!');
  }

  const groups = await Group.find({ members: userId }).populate(
    'owner',
    'name email'
  );

  if (!groups) {
    throw new ApiError(400, 'Groups not found!');
  }

  res.status(200).json(new ApiResponse(200, 'Groups found.', groups));
});

const getGroupById = asyncHandler(async (req, res) => {
  const { groupId } = req.params;

  if (!groupId) {
    throw new ApiError(400, 'Group id is required');
  }

  const group = await Group.findById(groupId).populate(
    'members',
    '_id name email'
  );

  if (!group) {
    throw new ApiError(404, 'Group not found');
  }

  res.status(200).json(new ApiResponse(200, 'Group found.', group));
});

const addMemberToGroup = asyncHandler(
  async (req: AuthenticatedRequest, res) => {
    const { groupId } = req.params;
    const { userId } = req.body;

    if (!groupId) {
      throw new ApiError(400, 'Group id is required');
    }

    if (!userId) {
      throw new ApiError(400, 'User id is required');
    }

    const group = await Group.findById(groupId);
    if (!group) {
      throw new ApiError(404, 'Group not found!');
    }

    group.members.push(userId);
    await group.save();

    res.status(200).json(new ApiResponse(200, 'Member added to group.', group));
  }
);

const removeMemberFromGroup = asyncHandler(
  async (req: AuthenticatedRequest, res) => {
    const { groupId } = req.params;
    const { userId } = req.body;

    if (!groupId) {
      throw new ApiError(400, 'Group id is required');
    }

    if (!userId) {
      throw new ApiError(400, 'User id is required');
    }

    const group = await Group.findById(groupId);
    if (!group) {
      throw new ApiError(404, 'Group not found!');
    }

    group.members.filter((member) => member.toString() !== userId);
    await group.save();

    res
      .status(200)
      .json(new ApiResponse(200, 'Member removed from group.', group));
  }
);

export const groupController = {
  createGroup,
  getUserGroups,
  getGroupById,
  addMemberToGroup,
  removeMemberFromGroup,
};
