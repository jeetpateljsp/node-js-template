import mongoose, { Model } from 'mongoose';
import MongoUtils from '@database/mongoUtils';

const saveMock = jest.fn();
jest.mock('mongoose', () => ({
    Model: jest.fn().mockImplementation(() => ({
        save: saveMock
    })),
}));

describe('transactionUtils tests', () => {
    // const spy = jest.spyOn(TestModel, 'countDocuments');

    let mongoUtils: MongoUtils<any>;
    let model: Model<any>;

    beforeAll(() => {
        model = mongoose.Model as any;
        mongoUtils = new MongoUtils<any>(model);
    })

    beforeEach(() => {
        saveMock.mockClear();
    });

    it('should create a new document', async () => {
        // Arrange
        const transactionData = {name: 'test'};
        saveMock.mockResolvedValueOnce(transactionData);

        // Act
        const result = await mongoUtils.create(transactionData);

        // Assert
        expect(saveMock).toHaveBeenCalled();
        expect(result).toEqual(transactionData);
    });

});