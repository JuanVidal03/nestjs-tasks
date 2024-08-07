import { HttpStatus } from "@nestjs/common";
import { Task } from "../task.entity";

export interface TaskResponse {
    status: HttpStatus,
    message: string,
    data?: any,
    error?: any
}