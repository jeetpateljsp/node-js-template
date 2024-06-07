import bunyan from 'bunyan';
import * as path from 'node:path';
import * as fs from 'node:fs';

const logger = (name: string) => {
    const date = new Date();
    const logFileName = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}.log`;
    const logFilePath = path.join('logs', logFileName);

    const logDir = path.dirname(logFilePath);
    if (!fs.existsSync(logDir)) {
        fs.mkdirSync(logDir, { recursive: true });
    }

    return bunyan.createLogger({
        name,
        streams: [
            {
                level: 'debug',
                path: logFilePath,
                type: 'rotating-file'
            },
            {
                level: 'info',
                stream: process.stdout
            },
            {
                level: 'error',
                path: 'error.log'
            }
        ],
        src: true, // Include the source code in the log. This is useful for debugging
        hostname: 'localhost', // Replace with os.hostname() if you want to log the hostname
        pid: process.pid // Include the current process id
    });
};

export default logger;
