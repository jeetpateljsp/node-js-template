import express, { Request, Response } from 'express';
import * as http from 'node:http';
import helmet from 'helmet';
import cors from 'cors';
import config from '@config';
import logger from '@utils/logger';
import { connectDB } from '@database/mongo';

const log = logger();

const app = express();
app.set('port', config().port || 9000);
app.use(helmet());
app.use(cors());
app.use(express.json());

const startServer = async () => {
    try{
        await connectDB();

        app.get('/', (req: Request, res: Response) => {
            res.send('node server at your service 🖖! ');
        });

        if (process.env.NODE_ENV !== 'test') {
            const server = http.createServer(app);
            server.listen(app.get('port'), () => {
                log.info('SERVER STARTED: Server is running at port %s ', app.get('port'));
            });
        }
    } catch (error) {
        log.error('Error starting server: %s', error);
    }
};

startServer().catch((error) => {
    log.error('Error starting server: %s', error);
});

export default app;
