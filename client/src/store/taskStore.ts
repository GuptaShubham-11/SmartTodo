import { create } from 'zustand';
import type { Task } from '../types/task';

interface TaskState {
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
  add: (task: Task) => void;
  update: (updateData: Partial<Task> & { _id: string }) => void;
  remove: (taskId: string) => void;
}

export const useTaskStore = create<TaskState>((set) => ({
  tasks: [],

  setTasks: (tasks: Task[]) => set({ tasks }),

  add: (task: Task) =>
    set((state) => ({
      tasks: [...state.tasks, task],
    })),

  update: (updateData) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task._id === updateData._id ? { ...task, ...updateData } : task
      ),
    })),

  remove: (taskId: string) =>
    set((state) => ({
      tasks: state.tasks.filter((task) => task._id !== taskId),
    })),
}));
