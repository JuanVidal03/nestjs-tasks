import { HttpStatus } from "@nestjs/common";
import { TaskDto } from "../task.entity";

export interface TaskResponse {
    status: HttpStatus,
    message: string,
    data?: any,
    error?: any
}