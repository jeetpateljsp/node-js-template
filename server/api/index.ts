import express from 'express';
import { TodoModel } from "@database/models/todo";
import { TodoAPI } from '@api/todo';

export default (app: express.Application) => {
    const router = express.Router();

    TodoAPI({ router, model: TodoModel });

    app.use('/todo', router);

}