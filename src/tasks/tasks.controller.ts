import { Body, Controller, Delete, Get, Param, Post, Put, Res } from '@nestjs/common';
import { Response } from 'express';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';
import { TaskResponse } from './interfaces/tasks.interface';


@Controller('tasks')
export class TasksController {

    constructor(
        private taskService: TasksService
    ){}


    @Get()
    getAllTasks(@Res() res:Response){
        const result: TaskResponse = this.taskService.getAllTasks();
        return res.status(200).json(result);
    }
    
    @Get(':id')
    getTaskById(
        @Param('id') id: string,
        @Res() res:Response
    ){
        const result: TaskResponse = this.taskService.getTaskById(id); 
        return res.status(result.status).json(result);
    }

    @Post()
    createTask(
        @Body() newTask: Task,
        @Res() res:Response
    ){
        const result: TaskResponse = this.taskService.createTask(newTask.title, newTask.description);
        return res.status(result.status).json(result);
    }

    @Delete(':id')
    deleteTask(
        @Param('id') id:string,
        @Res() res:Response
    ){
        const result: TaskResponse = this.taskService.deleteTask(id);
        return res.status(result.status).json(result);
    }

    
    @Put(':id')
    updateTask(
        @Param('id') id:string,
        @Body() updatedTask: Task,
        @Res() res:Response
    ){
        const result: TaskResponse = this.taskService.updateTask(id, updatedTask); 
        return res.status(result.status).json(result);
    }

}
