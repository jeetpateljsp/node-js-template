import mongoose from 'mongoose';
import logger from '@utils/logger';
import getMongoUri from '@database/mongoConfig';

const log = logger();

export const connectDB = () => {
    let db;
    if (mongoose.connection.readyState === 1) {
        log.info('Database is already connected');
        db = mongoose.connection;
    } else {
        mongoose.connect(getMongoUri()).then(r => {
            log.info('Connected to database');
        });
        db = mongoose.connection;
        db.on('error', (error) => {
            log.error('Error connecting to database', error);
        });
        db.once('open', () => {
            log.info('Connected to database, URI: %s', getMongoUri());
        });
    }
    return db;
};