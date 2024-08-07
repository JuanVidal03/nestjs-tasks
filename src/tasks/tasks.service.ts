import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Task } from './task.entity';
import { TaskStatus } from './task.entity';
import { TaskResponse } from './interfaces/tasks.interface';

@Injectable()
export class TasksService {

    private tasks: Task[] = [{
        id: '1',
        title: 'first task',
        description: 'some task',
        status: TaskStatus.PENDING
    }];
    

    getAllTasks(): TaskResponse{
        try {

            return {
                status: HttpStatus.OK,
                message: "Tasks retrieved successfully",
                data: this.tasks
            };
            
        } catch (error) {
            throw new HttpException({
                error: error.message,
                message: "Error getting all tasks.",
            }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    createTask(title: string, description: string): TaskResponse{

        try {

            const task:Task = {
                id: new Date().toISOString(),
                title,
                description,
                status: TaskStatus.PENDING
            }

            this.tasks.push(task);
            
            return {
                status: HttpStatus.CREATED,
                message: "Task created successfully",
                data: task,
            };

        } catch (error) {
            throw new HttpException({
                error: error.message,
                message: "Error creating task",
            }, HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    getTaskById(id: string): TaskResponse{

        try {
            
            const findTask: Task = this.tasks.find(task => task.id === id);
            if (!findTask) {
                return {
                    status: HttpStatus.NOT_FOUND,
                    message: `There is no task with id: ${id}`,
                };
            }

            return {
                status: HttpStatus.OK,
                message: "Found task successfully",
                data: findTask,
            };
            
        } catch (error) {
            throw new HttpException({
                error: error.message,
                message: `Error getting the task with id: ${id}`
            }, HttpStatus.BAD_REQUEST);
        }

    }
    
    updateTask(id:string, updatedFields:Task): TaskResponse{
        
        try {
            
            const findTask = this.getTaskById(id);
            if (!findTask) {
                return findTask;
            }

            const findIndexTask = this.tasks.findIndex(task => task.id === id);

            const updatedTask: Task = {
                id: findTask.data.id,
                title: updatedFields.title || findTask.data.title,
                description: updatedFields.description || findTask.data.description,
                status: updatedFields.status || findTask.data.status
            }

            this.tasks.splice(findIndexTask, 1, updatedTask);

            return {
                status: HttpStatus.OK,
                message: `Task with id: ${id} has been updated successfully`,
                data: this.tasks,
            }
            
        } catch (error) {
            throw new HttpException({
                error: error.message,
                message: `Error updating task with id: ${id}`,
            }, HttpStatus.INTERNAL_SERVER_ERROR)
        }

    }


    deleteTask(id: string): TaskResponse{

        try {
            
        const findTaskIndex = this.tasks.findIndex(task => task.id === id);
        if (findTaskIndex < 0) {
            return {
                status: HttpStatus.NOT_FOUND,
                message: `There is no task with id: ${id}`,
            };
        }
        
        this.tasks.splice(findTaskIndex, 1);

        return {
            status: HttpStatus.OK,
            message: `Task with id: ${id} has deleted successfully`,
            data: this.tasks,
        };
            
        } catch (error) {
            throw new HttpException({
                error: error.message,
                message: `Error deteleting the task with id: ${id}`
            }, HttpStatus.INTERNAL_SERVER_ERROR)
        }

    }

}
