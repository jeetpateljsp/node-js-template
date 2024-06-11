import mongoose, { Model, Document } from 'mongoose';
import MongoUtils from '@database/mongoUtils';

interface TodoDoc extends Document {
    title: string;
    desc: string;
    status: 'pending' | 'ongoing' | 'completed';
    createdAt: Date;
    updatedAt: Date;
}

const saveMock = jest.fn();
jest.mock('mongoose', () => ({
    Model: jest.fn().mockImplementation(() => ({
        save: saveMock
    })),
}));

describe('transactionUtils tests', () => {
    // const spy = jest.spyOn(TestModel, 'countDocuments');

    let mongoUtils: MongoUtils<TodoDoc>;
    let model: Model<TodoDoc>;

    beforeAll(() => {
        model = mongoose.Model as any;
        mongoUtils = new MongoUtils<TodoDoc>(model);
    })

    beforeEach(() => {
        saveMock.mockClear();
    });

    it('should create a new document', async () => {
        // Arrange
        const transactionData: TodoDoc = new model({
            title: 'test',
            desc: 'test desc',
            status: 'pending',
        })
        saveMock.mockResolvedValueOnce(transactionData);

        // Act
        const result = await mongoUtils.create(transactionData);

        // Assert
        expect(saveMock).toHaveBeenCalled();
        expect(result).toEqual(transactionData);
    });

});