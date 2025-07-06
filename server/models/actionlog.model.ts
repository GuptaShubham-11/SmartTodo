import mongoose, { Schema, Document } from 'mongoose';

export interface IActionLog extends Document {
  boardId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  actionType:
    | 'CREATE_TASK'
    | 'UPDATE_TASK'
    | 'DELETE_TASK'
    | 'SMART_ASSIGN_Task';
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

const actionLogSchema = new Schema<IActionLog>(
  {
    boardId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Board',
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    actionType: {
      type: String,
      enum: ['CREATE_TASK', 'UPDATE_TASK', 'DELETE_TASK'],
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const ActionLog = mongoose.model<IActionLog>('ActionLog', actionLogSchema);
export default ActionLog;
