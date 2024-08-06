import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';


@Controller('tasks')
export class TasksController {

    constructor(
        private taskService: TasksService
    ){}


    @Get()
    getAllTasks(): Task[]{
        return this.taskService.getAllTasks()
    }
    
    @Get(':id')
    getTaskById(@Param('id') id: string){
        return this.taskService.getTaskById(id);
    }

    @Post()
    createTask(@Body() newTask: Task): Task{
        return this.taskService.createTask(newTask.title, newTask.description);
    }

    @Delete(':id')
    deleteTask(@Param('id') id:string): Task[] | string{
        return this.taskService.deleteTask(id);
    }

    @Put(':id')
    updateTask(@Param('id') id:string, @Body() updatedTask: Task){
        return this.taskService.updateTask(id, updatedTask);
    }

}
