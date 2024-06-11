import mongoose, { Model, Document, FilterQuery } from 'mongoose';
import MongoUtils from '@database/mongoUtils';
import { ITodo } from '@models/todo';

const saveMock = jest.fn();
const findOneMock = jest.fn();
const modelMock = {
    save: saveMock,
    findOne: findOneMock,
}
jest.mock('mongoose', () => ({
    Model: jest.fn().mockImplementation(() => ({
        save: saveMock,
    }))
}));

describe('transactionUtils tests', () => {

    let mongoUtils: MongoUtils<ITodo>;
    let model: Model<ITodo>;

    beforeAll(() => {
        model = Model as any;
        mongoUtils = new MongoUtils<ITodo>(model);
    })

    beforeEach(() => {
        Model.findOne = findOneMock;
        saveMock.mockClear();
        findOneMock.mockClear();
    });

    it('should create a new document', async () => {
        // Arrange
        const transactionData: ITodo = new model({
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
        const filter: FilterQuery<ITodo> = {title: 'test'};
        const expectedData: ITodo = new model({
            title: 'test',
            desc: 'test desc',
            status: 'pending',
        });
        findOneMock.mockReturnValueOnce({
            exec: jest.fn().mockResolvedValue(expectedData)
        });

        // Act
        const result = await mongoUtils.readOne(filter);

        // Assert
        expect(findOneMock).toHaveBeenCalledWith(filter);
        expect(result).toEqual(expectedData);
    });

});