import apiClient from './apiClient';

const createBoard = async (data: any) => {
  try {
    const response = await apiClient.post('/boards/', data);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

const getBoardsByGroupId = async (groupId: string) => {
  try {
    const response = await apiClient.get(`/boards/group/${groupId}`);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

const getBoardById = async (boardId: string) => {
  try {
    const response = await apiClient.get(`/boards/${boardId}`);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

const updateBoard = async (boardId: string, data: any) => {
  try {
    const response = await apiClient.put(`/boards/${boardId}`, data);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

const deleteBoard = async (boardId: string) => {
  try {
    const response = await apiClient.delete(`/boards/${boardId}`);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

const addMemberToBoard = async (boardId: string, data: any) => {
  try {
    const response = await apiClient.put(`/boards/add-member/${boardId}`, data);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

const removeMemberFromBoard = async (boardId: string, data: any) => {
  try {
    const response = await apiClient.put(
      `/boards/remove-member/${boardId}`,
      data
    );
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

const getMembersByBoard = async (boardId: string) => {
  try {
    const response = await apiClient.get(`/boards/${boardId}/members`);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

const getActionLogs = async (boardId: string) => {
  try {
    const response = await apiClient.get(`/actionlogs/board/${boardId}`);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const boardApi = {
  createBoard,
  getBoardsByGroupId,
  getBoardById,
  updateBoard,
  deleteBoard,
  addMemberToBoard,
  removeMemberFromBoard,
  getMembersByBoard,
  getActionLogs,
};
