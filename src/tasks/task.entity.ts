import { IsNotEmpty, IsString, IsEnum } from "class-validator";

export enum TaskStatus {
    PENDING = 'PENDING',
    IN_PROGRESS = 'IN_PROGRESS',
    DONE = 'DONE',
}

export class Task {
    id?: string
    
    @IsString()
    @IsNotEmpty()
    title: string

    @IsString()
    @IsNotEmpty()
    description: string
    
    @IsEnum(TaskStatus)
    status!: TaskStatus
}
