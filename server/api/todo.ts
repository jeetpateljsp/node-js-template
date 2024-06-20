import MongoUtils from '@database/mongoUtils';
import {apiSuccess, apiFailure} from '@utils/responseUtils';
import { Router, Request, Response } from 'express';
import { ITodo } from '@models/todo';
import { Model } from 'mongoose';

interface ApiDependencies {
    router: Router;
    model: Model<ITodo>;

}

export const TodoAPI = ({ router, model }: ApiDependencies) => {
    const todoUtils = new MongoUtils<ITodo>(model);

    router.post('/', async (req: Request, res: Response) => {
        try {
            const data = req.body;
            const result = await todoUtils.create(data);
            apiSuccess(res, result);
        } catch (error) {
            apiFailure(res, error);
        }
    });

    router.get('/:id', async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            const result = await todoUtils.readOne({ _id: id });
            apiSuccess(res, result);
        } catch (error) {
            apiFailure(res, error);
        }
    });

    router.get('/', async (req: Request, res: Response) => {
        try {
            const result = await todoUtils.readAll(model);
            apiSuccess(res, result);
        } catch (error) {
            apiFailure(res, error);
        }
    });

    router.put('/:id', async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            const data = req.body;
            const result = await todoUtils.update(id, data);
            apiSuccess(res, result);
        } catch (error) {
            apiFailure(res, error);
        }
    });

    router.delete('/:id', async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            const result = await todoUtils.delete(id);
            apiSuccess(res, result);
        } catch (error) {
            apiFailure(res, error);
        }
    });

    router.delete('/', async (req: Request, res: Response) => {
        try {
            const result = await todoUtils.deleteAll();
            apiSuccess(res, result);
        } catch (error) {
            apiFailure(res, error);
        }
    });

}