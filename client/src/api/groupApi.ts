import apiClient from './apiClient';

const createGroup = async (data: any) => {
  try {
    const response = await apiClient.post('/groups/create-group', data);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

const getUserGroups = async () => {
  try {
    const response = await apiClient.get('/groups/user-groups');
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

const getGroupById = async (groupId: string) => {
  try {
    const response = await apiClient.get(`/groups/${groupId}`);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

const addMemberToGroup = async (boardId: string, userId: string) => {
  try {
    const response = await apiClient.put(`/groups/add-member/${boardId}`, {
      userId,
    });
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

const removeMemberFromGroup = async (boardId: string, userId: string) => {
  try {
    const response = await apiClient.put(
      `/groups/remove-member/${boardId}`,
      userId
    );
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const groupApi = {
  createGroup,
  getUserGroups,
  getGroupById,
  addMemberToGroup,
  removeMemberFromGroup,
};
