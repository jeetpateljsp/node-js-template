import logger from '@utils/logger';
import { Response } from 'express';

const log = logger();

export const apiSuccess = (res: Response, data: any) => {
    log.info('API SUCCESS:', { res });
    return res.send({ data }).status(200);
}

export const apiFailure = (res: Response, error: any) => {
    log.error('API FAILURE:', { error });
    return res.status(500).send({ error });
}
