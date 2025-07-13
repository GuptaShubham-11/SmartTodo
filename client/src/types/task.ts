export interface User {
  _id: string;
  name: string;
}

export interface Task {
  _id: string;
  title: string;
  description: string;
  status: 'todo' | 'in progress' | 'done';
  priority: 'high' | 'medium' | 'low';
  assignedTo?: User;
  boardId: string;
}
