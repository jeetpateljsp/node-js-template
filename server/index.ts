import express, { Request, Response } from 'express';
import * as http from 'node:http';
import helmet from 'helmet';
import cors from 'cors';
import config from '@config';
import logger from '@utils/logger';
import { apiSuccess } from '@utils/responseUtils';
import { connectDB } from '@database/mongo';
import api from '@api/index';

const log = logger();

const app = express();
app.set('port', config().port || 9000);
app.use(helmet());
app.use(cors());
app.use(express.json());

try{
    connectDB();
} catch (error) {
    log.error('Error starting server: %s', error);
}

app.get('/', (req: Request, res: Response) => {
    apiSuccess(res, 'node server at your service 🖖! ');
});

api(app);

if (process.env.NODE_ENV !== 'test') {
    const server = http.createServer(app);
    server.listen(app.get('port'), () => {
        log.info('SERVER STARTED: Server is running at port %s ', app.get('port'));
    });
}

export default app;
