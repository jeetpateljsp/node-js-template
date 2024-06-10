import mongoose from 'mongoose';
import logger from '@utils/logger';
import getMongoUri from '@database/mongoConfig';

const log = logger();

export const connectDB = async () => {
    let db;
    if (mongoose.connection.readyState === 1) {
        log.info('Database is already connected');
        db = mongoose.connection;
    } else {
        await mongoose.connect(getMongoUri());
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