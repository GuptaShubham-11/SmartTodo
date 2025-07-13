import apiClient from './apiClient';

const createTask = async (data: any) => {
  try {
    const response = await apiClient.post('/tasks/', data);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

const getTasksByBoard = async (boardId: string) => {
  try {
    const response = await apiClient.get(`/tasks/board/${boardId}`);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

const updateTask = async (taskId: string, data: any) => {
  try {
    const response = await apiClient.put(`/tasks/${taskId}`, data);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

const deleteTask = async (taskId: string) => {
  try {
    const response = await apiClient.delete(`/tasks/${taskId}`);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

const assignTask = async (taskId: string, payload: any) => {
  try {
    const response = await apiClient.put(`/tasks/assign/${taskId}/`, payload);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

const smartAssign = async (boardId: string, taskId: string) => {
  try {
    const response = await apiClient.put(
      `/tasks/smart-assign/${boardId}/${taskId}`
    );
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const taskApi = {
  createTask,
  getTasksByBoard,
  updateTask,
  deleteTask,
  smartAssign,
  assignTask,
};
