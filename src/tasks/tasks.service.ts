import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { TaskDto } from './dto/task.entity';
import { TaskStatus } from './dto/task.entity';
import { TaskResponse } from './interfaces/tasks.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Task } from './schemas/tasks.schema';
import { Model } from 'mongoose';

@Injectable()
export class TasksService {

    constructor(
        @InjectModel(Task.name) private taskModel: Model<Task>
    ){}

    async getAllTasks(): Promise<TaskResponse>{
        try {
            const tasks = await this.taskModel.find();

            return {
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


    async createTask(newTask: TaskDto): Promise<TaskResponse>{

        try {

            const task:TaskDto = {
                title: newTask.title,
                description: newTask.description,
                status: TaskStatus.PENDING
            }
            
            const createdTask = await this.taskModel.create(task);
            createdTask.save();
            
            return {
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

    // por que al intentar este metodo de manera negativa, hay una combinacion del httpException de la linea 69 y de la linea del catch?
    async getTaskById(id: string): Promise<TaskResponse>{

        try {

            const findTask: TaskDto = await this.taskModel.findById(id);

            if (!findTask) {
                throw new HttpException({
                    message: `Task with id: ${id} has not been found.`
                }, HttpStatus.NOT_FOUND);
            }

            return {
                message: "Task found successfully.",
                data: findTask,
            };
            
        } catch (error) {
            throw new HttpException({
                error: error.message,
                message: `Error getting the task with id: ${id}`
            }, HttpStatus.BAD_REQUEST);
        }

    }

    async updateTask(id:string, updatedFields:TaskDto): Promise<TaskResponse>{
        
        try {
            
            const findTask = await this.getTaskById(id);
            if (!findTask) {
                return findTask;
            }
            
            const updatedTask: TaskDto = {
                id: findTask.data["_id"],
                title: updatedFields.title || findTask.data["title"],
                description: updatedFields.description || findTask.data["description"],
                status: updatedFields.status || findTask.data["status"]
            }

            await this.taskModel.findByIdAndUpdate({ _id: id }, updatedTask);
           
            return {
                message: `Task with id: ${id} has been updated successfully`,
                data: updatedTask,
            }
            
        } catch (error) {
            throw new HttpException({
                error: error.message,
                message: `Error updating task with id: ${id}`,
            }, HttpStatus.INTERNAL_SERVER_ERROR)
        }

    }

    // porque no entra en la condicional del if, sino que pasa de una vez al catch
    async deleteTask(id: string): Promise<TaskResponse>{

        try {
            
            const findTask = await this.getTaskById(id);
            if (!findTask) {
                return findTask;
            }


            await this.taskModel.deleteOne({ _id: id });

            return {
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
