import { ApiError } from '../utils/ApiError';
import { ApiResponse } from '../utils/ApiResponse';
import { asyncHandler } from '../utils/asyncHandler';
import ActionLog from '../models/actionlog.model';

const getActionLogs = asyncHandler(async (req, res) => {
  const { boardId } = req.params;

  if (!boardId) {
    throw new ApiError(400, 'Board id is required');
  }

  const logs = await ActionLog.find({ boardId })
    .populate('userId', 'name email')
    .sort({ createdAt: -1 });

  if (!logs) {
    throw new ApiError(404, 'Action logs not found');
  }

  res.status(200).json(new ApiResponse(200, 'Action logs fetched.', logs));
});

export const actionLogController = {
  getActionLogs,
};
