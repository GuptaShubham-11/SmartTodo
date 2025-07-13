import apiClient from './apiClient';

const getDashboardData = async () => {
  try {
    const response = await apiClient.get('/dashboards/');
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

const getPopularBoards = async () => {
  try {
    const response = await apiClient.get('/dashboards/popular-boards');
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

const getTaskStatusRatio = async () => {
  try {
    const response = await apiClient.get('/dashboards/task-status-ratio');
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

const getUserActivity = async () => {
  try {
    const response = await apiClient.get('/dashboards/user-activity');
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const dashboardApi = {
  getDashboardData,
  getPopularBoards,
  getTaskStatusRatio,
  getUserActivity,
};
