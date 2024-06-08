import * as mongoose from 'mongoose';
import logger from '@utils/logger';
import getMongoUrl from '@database/mongoConfig';

const log = logger('mongo-connection');

export const connectDB = async () => {
    let db;

    if (mongoose.connection.readyState === 1) {
        log.info('Database is already connected');
        db = mongoose.connection;
    } else {
        // @Todo: Complete the new connection string
    }
    return db;
};