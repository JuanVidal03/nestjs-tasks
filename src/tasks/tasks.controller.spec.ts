import { TasksController } from "./tasks.controller";
import { TasksService } from "./tasks.service";
import { getModelToken } from "@nestjs/mongoose";
import { Task } from "./schemas/tasks.schema";
import { Response } from "express";
import { HttpStatus } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { Model } from "mongoose";
import { TaskResponse } from "./interfaces/tasks.interface";

describe('TaskController', () => {

    let taskController: TasksController;
    let taskService: TasksService;

    beforeEach(async () => {

        const module: TestingModule = await Test.createTestingModule({
            controllers: [TasksController],
            providers: [
                TasksService,
                {
                    provide: getModelToken(Task.name),
                    useValue: Model
                }
            ]
        }).compile();

        taskService = module.get<TasksService>(TasksService);
        taskController = module.get<TasksController>(TasksController);
    });

    describe('getAllTasks', () => {

        it ('should return all tasks', async() => {

            const result:TaskResponse = {
                status: HttpStatus.OK,
                message: "Tasks retrieved successfully.",
                data: ['tasks']
            };

            jest.spyOn(taskService, "getAllTasks").mockResolvedValue(result);

            const mockResponse = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn().mockReturnThis(),
            } as unknown as Response;

            await taskController.getAllTasks(mockResponse);
            expect(mockResponse.status).toHaveBeenCalledWith(200);
            expect(mockResponse.json).toHaveBeenCalledWith(result);

        });
    });

});