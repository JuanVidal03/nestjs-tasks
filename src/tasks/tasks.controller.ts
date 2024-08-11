import { Body, Controller, Delete, Get, Param, Post, Put, Res } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TaskDto } from './dto/task.entity';
import { TaskResponse } from './interfaces/tasks.interface';


@Controller('tasks')
export class TasksController {

    constructor(
        private taskService: TasksService
    ){}


    @Get()
    async getAllTasks(): Promise<TaskResponse>{
        return await this.taskService.getAllTasks();
    }

    @Post()
    async createTask(
        @Body() newTask: TaskDto,
    ): Promise<TaskResponse>{
        return await this.taskService.createTask(newTask);
    }

    @Get(':id')
    async getTaskById(
        @Param('id') id: string,
    ): Promise<TaskResponse>{
        return await this.taskService.getTaskById(id);
    }

    @Delete(':id')
    async deleteTask(
        @Param('id') id:string,
    ): Promise<TaskResponse>{
        return await this.taskService.deleteTask(id);
    }

    @Put(':id')
    async updateTask(
        @Param('id') id:string,
        @Body() updatedTask: TaskDto
    ): Promise<TaskResponse>{
        return await this.taskService.updateTask(id, updatedTask); 
    }

}
