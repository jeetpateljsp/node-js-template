const envFile: string = `.env.${process.env.ENVIRONMENT_NAME}`;

require('dotenv-safe').config({
    path: envFile,
    example: '.env.example',
    allowEmptyValues: true
});

export default () => ({
    port: process.env.PORT,
    mongoPort: process.env.MONGO_PORT,
    mongoUri: process.env.MONGO_URI,
    mongoDbName: process.env.MONGO_DB_NAME,
    memory: true
});
