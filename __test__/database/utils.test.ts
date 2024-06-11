import mongoose, { Model, Document, FilterQuery } from 'mongoose';
import MongoUtils from '@database/mongoUtils';

interface TodoDoc extends Document {
    title: string;
    desc: string;
    status: 'pending' | 'ongoing' | 'completed';
    createdAt: Date;
    updatedAt: Date;
}

const saveMock = jest.fn();
const findOneMock = jest.fn();
jest.mock('mongoose', () => ({
    Model: jest.fn().mockImplementation(() => ({
        save: saveMock,
        findOne: findOneMock,
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
        findOneMock.mockClear();
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

    it('should read a document when one matches the filter', async () => {
        // Arrange
        const filter: FilterQuery<TodoDoc> = {title: 'test'};
        const expectedData: TodoDoc = new model({
            title: 'test',
            desc: 'test desc',
            status: 'pending',
        });
        findOneMock.mockResolvedValueOnce(expectedData);

        // Act
        const result = await mongoUtils.readOne(filter);

        // Assert
        expect(saveMock).toHaveBeenCalled();
        expect(result).toEqual(expectedData);
    });

});