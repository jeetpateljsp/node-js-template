import bunyan from 'bunyan';
import * as path from 'node:path';
import * as fs from 'node:fs';
import config from '@config';

const logger = () => {

    const logFilePath = path.join('logs', `${new Date().toDateString()}.log`);
    const name = config().app_name || 'node-server';
    if (!fs.existsSync('logs')) {
        fs.mkdirSync('logs', { recursive: true });
    }

    return bunyan.createLogger({
        name,
        streams: [
            { level: 'debug', path: logFilePath},
            { level: 'info', stream: process.stdout},
            { level: 'error', path: 'error.log'}
        ],
        serializers: bunyan.stdSerializers,
        src: true, // Include the source code in the log. This is useful for debugging
        pid: process.pid // Include the current process id
    });
};

export default logger;
