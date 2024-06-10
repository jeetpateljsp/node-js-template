import dotenvSafe from 'dotenv-safe';

const envFile = `.env.${process.env.ENVIRONMENT_NAME}`;

dotenvSafe.config({
    path: envFile,
    example: '.env.example',
    allowEmptyValues: true
});

export default () => ({
    app_name: process.env.APPLICATION_NAME,
    port: process.env.PORT,
    mongoPort: process.env.MONGO_PORT,
    mongoUri: process.env.MONGO_BASE_URI,
    mongoDbName: process.env.MONGO_DB_NAME,
    mongoUser: process.env.MONGO_DB_USER,
    mongoPassword: process.env.MONGO_DB_PASSWORD,
    memory: true
});
