import { Injectable } from '@nestjs/common';
import { Task } from './task.entity';
import { TaskStatus } from './task.entity';

@Injectable()
export class TasksService {

    private tasks: Task[] = [{
        id: '1',
        title: 'first task',
        description: 'some task',
        status: TaskStatus.PENDING
    }];
    

    getAllTasks(): Task[]{
        return this.tasks;
    }

    createTask(title: string, description: string): Task{
        
        const task:Task = {
            id: new Date().toISOString(),
            title,
            description,
            status: TaskStatus.PENDING
        }

        this.tasks.push(task);
        return task;

    }

    getTaskById(id: string): Task | string{
        const findTask: Task = this.tasks.find(task => task.id === id);
        if (!findTask) {
            return `There is no task with id: ${id}`;
        }

        return findTask;

    }

    updateTask(id:string, updatedFields:Task){
        
        const findTask = this.getTaskById(id);
        if (typeof findTask === 'string') {
            return findTask;
        }

        const findIndexTask = this.tasks.findIndex(task => task.id === id);

        const updatedTask: Task = {
            id: findTask.id,
            title: updatedFields.title || findTask.title,
            description: updatedFields.description || findTask.description,
            status: updatedFields.status || findTask.status
        }

        this.tasks.splice(findIndexTask, 1, updatedTask);

        return this.tasks;

    }

    deleteTask(id: string): Task[] | string{

        const findTask = this.tasks.findIndex(task => task.id === id);
        console.log(id, findTask);
        
        if (findTask < 0) {
            return `There is no task with id: ${id}`;
        }
        
        this.tasks.splice(findTask, 1);
        return this.tasks;
    }

}
