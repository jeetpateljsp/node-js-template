import express, { Request, Response } from 'express';
import * as http from 'node:http';
import helmet from 'helmet';
import cors from 'cors';
import config from '@config';
import logger from '@utils/logger';
import { connectDB } from '@database/mongo';

const log = logger(config().app_name || 'node-server');

const app = express();
app.set('port', config().port || 9000);
app.use(helmet());
app.use(cors());
app.use(express.json());
connectDB();

app.get('/', (req: Request, res: Response) => {
    res.send('node server at your service 🖖! ');
});

if (process.env.NODE_ENV !== 'test') {
    const server = http.createServer(app);
    server.listen(app.get('port'), () => {
        console.log('Server is running at port %s', app.get('port'));
        log.info('Server is running at port %s', app.get('port'));
    });
}

export default app;
