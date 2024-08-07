import { Body, Controller, Delete, Get, Param, Post, Put, Res } from '@nestjs/common';
import { Response } from 'express';
import { TasksService } from './tasks.service';
import { TaskDto } from './task.entity';
import { TaskResponse } from './interfaces/tasks.interface';


@Controller('tasks')
export class TasksController {

    constructor(
        private taskService: TasksService
    ){}


    @Get()
    async getAllTasks(@Res() res:Response){
        const result: TaskResponse = await this.taskService.getAllTasks();
        return res.status(200).json(result);
    }
    
    @Get(':id')
    async getTaskById(
        @Param('id') id: string,
        @Res() res:Response
    ){
        const result: TaskResponse = await this.taskService.getTaskById(id); 
        return res.status(result.status).json(result);
    }

    @Post()
    async createTask(
        @Body() newTask: TaskDto,
        @Res() res:Response
    ){
        const result: TaskResponse = await this.taskService.createTask(newTask.title, newTask.description);
        return res.status(result.status).json(result);
    }

    /*
    @Delete(':id')
    deleteTask(
        @Param('id') id:string,
        @Res() res:Response
    ){
        const result: TaskResponse = this.taskService.deleteTask(id);
        return res.status(result.status).json(result);
    }
    */

    /*
    @Put(':id')
    updateTask(
        @Param('id') id:string,
        @Body() updatedTask: TaskDto,
        @Res() res:Response
    ){
        const result: TaskResponse = this.taskService.updateTask(id, updatedTask); 
        return res.status(result.status).json(result);
    }*/

}
