require('dotenv-safe').config({
    path: '.env.test',
    example: '.env.example',
    allowEmptyValues: true
});
process.env.ENVIRONMENT_NAME = 'test';

beforeEach(() => {
    process.env = {
        ...process.env, ENVIRONMENT_NAME: 'test'
    };
});

afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
    jest.resetModules();
});