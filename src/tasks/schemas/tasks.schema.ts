import { Schema, SchemaFactory, Prop } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { TaskStatus } from "../dto/task.entity";

export type TaskDocument = HydratedDocument<Task>;

@Schema()
export class Task{
    @Prop({
        required: true,
        trim: true
    })
    title: string;
    
    @Prop({
        required: true,
        trim: true
    })
    description: string;

    @Prop({
        required: true,
        enum: [TaskStatus.PENDING, TaskStatus.IN_PROGRESS, TaskStatus.DONE]
    })
    status: TaskStatus
}

export const TaskSchema = SchemaFactory.createForClass(Task);
