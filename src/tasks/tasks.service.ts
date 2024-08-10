import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { TaskDto } from './task.entity';
import { TaskStatus } from './task.entity';
import { TaskResponse } from './interfaces/tasks.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Task } from './schemas/tasks.schema';
import { Model } from 'mongoose';

@Injectable()
export class TasksService {

    constructor( @InjectModel(Task.name) private taskModel: Model<Task> ){}

    async getAllTasks(): Promise<TaskResponse>{
        try {
            const tasks = await this.taskModel.find();

            return {
                status: HttpStatus.OK,
                message: "Tasks retrieved successfully",
                data: tasks
            };
            
        } catch (error) {
            throw new HttpException({
                error: error.message,
                message: "Error getting all tasks.",
            }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async createTask(title: string, description: string): Promise<TaskResponse>{

        try {

            const task:TaskDto = {
                title,
                description,
                status: TaskStatus.PENDING
            }
            
            const createdTask = await this.taskModel.create(task);
            createdTask.save();
            
            return {
                status: HttpStatus.CREATED,
                message: "Task created successfully",
                data: createdTask,
            };

        } catch (error) {
            throw new HttpException({
                error: error.message,
                message: "Error creating task",
            }, HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    async getTaskById(id: string): Promise<TaskResponse>{

        try {

            const findTask: TaskDto = await this.taskModel.findById(id);

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
    /*
    updateTask(id:string, updatedFields:TaskDto): TaskResponse{
        
        try {
            
            const findTask = this.getTaskById(id);
            if (findTask.status !== HttpStatus.OK) {
                return findTask;
            }

            const findIndexTask = this.tasks.findIndex(task => task.id === id);

            const updatedTask: TaskDto = {
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
    */

    async deleteTask(id: string): Promise<TaskResponse>{

        try {
            
        const findTask = await this.taskModel.findById(id);
        if (!findTask) {
            return {
                status: HttpStatus.NOT_FOUND,
                message: `There is no task with id: ${id}.`,
            };
        }
        
        await this.taskModel.deleteOne({ _id: id });

        return {
            status: HttpStatus.OK,
            message: `Task with id: ${id} has been deleted successfully.`,
            data: [],
        };
            
        } catch (error) {
            throw new HttpException({
                error: error.message,
                message: `Error deteleting the task with id: ${id}.`
            }, HttpStatus.INTERNAL_SERVER_ERROR)
        }

    }

}
