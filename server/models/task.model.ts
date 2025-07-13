import mongoose, { Schema, Document } from 'mongoose';

export type TaskStatus = 'todo' | 'in progress' | 'done';
export type TaskPriority = 'low' | 'medium' | 'high';

export interface ITask extends Document {
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  assignedTo: mongoose.Types.ObjectId | null;
  boardId: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const taskSchema = new Schema<ITask>(
  {
    title: { type: String, required: true },
    description: { type: String },
    status: {
      type: String,
      enum: ['todo', 'in progress', 'done'],
      default: 'todo',
    },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high'],
      default: 'medium',
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    boardId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Board',
      required: true,
    },
  },
  { timestamps: true }
);

const Task = mongoose.model<ITask>('Task', taskSchema);
export default Task;
