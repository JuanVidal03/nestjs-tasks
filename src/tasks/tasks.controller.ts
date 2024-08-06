import { Body, Controller, Get, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';


@Controller('tasks')
export class TasksController {

    constructor(
        private taskService: TasksService
    ){}


    @Get()
    getAllTasks(){
        return this.taskService.getAllTasks()
    }


    @Post()
    createTask(@Body() newTask: Task){
        return this.taskService.createTask(newTask.title, newTask.description);
    }

}