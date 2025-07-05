import mongoose, { Schema, Document, Types } from "mongoose";

export interface IGroup extends Document {
    name: string;
    owner: Types.ObjectId;
    members: Types.ObjectId[];
    createdAt: Date;
    updatedAt: Date;
}

const GroupSchema = new Schema<IGroup>(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        members: [
            {
                type: Schema.Types.ObjectId,
                ref: "User",
            },
        ],
    },
    {
        timestamps: true,
    }
);

const Group = mongoose.model<IGroup>("Group", GroupSchema);
export default Group;
