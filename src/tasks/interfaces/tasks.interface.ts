import { TaskDto } from "../dto/task.entity";

export interface TaskResponse {
    message: string,
    data: TaskDto[] | TaskDto | [],
}