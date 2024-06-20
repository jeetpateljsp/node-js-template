import { FilterQuery, Model, UpdateQuery } from 'mongoose';
import MongoUtils from '@database/mongoUtils';
import { ITodo } from '@models/todo';

const saveMock = jest.fn();
const findOneMock = jest.fn();
const findMock = jest.fn();
const findByIdAndUpdateMock = jest.fn();
const findByIdAndDeleteMock = jest.fn();
const deleteManyMock = jest.fn();
const modelMock = {
    save: saveMock,
    findOne: findOneMock,
    find: findMock,
    findByIdAndUpdate: findByIdAndUpdateMock,
    findByIdAndDelete: findByIdAndDeleteMock,
    deleteMany: deleteManyMock
};

jest.mock('mongoose', () => ({
    Model: jest.fn().mockImplementation(() => modelMock)
}));

describe('transactionUtils tests', () => {

    let mongoUtils: MongoUtils<ITodo>;
    let model: Model<ITodo>;

    beforeAll(() => {
        model = Model as unknown as Model<ITodo>;
        mongoUtils = new MongoUtils<ITodo>(model);
    });

    beforeEach(() => {
        Model.findOne = findOneMock;
        Model.find = findMock;
        Model.findByIdAndUpdate = findByIdAndUpdateMock;
        Model.findByIdAndDelete = findByIdAndDeleteMock;
        Model.deleteMany = deleteManyMock;
        saveMock.mockClear();
        findOneMock.mockClear();
    });

    it('should create a new document', async () => {
        // Arrange
        const transactionData: ITodo = new model({
            title: 'test',
            desc: 'test desc',
            status: 'pending'
        });
        saveMock.mockResolvedValueOnce(transactionData);

        // Act
        const result = await mongoUtils.create(transactionData);

        // Assert
        expect(saveMock).toHaveBeenCalled();
        expect(result).toEqual(transactionData);
    });

    it('should read a document when one matches the filter', async () => {
        // Arrange
        const filter: FilterQuery<ITodo> = { title: 'test' };
        const expectedData: ITodo = new model({
            title: 'test',
            desc: 'test desc',
            status: 'pending'
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

    it('should return null when no document matches the filter', async () => {
        // Arrange
        const filter: FilterQuery<ITodo> = { name: 'nonexistent' };
        findOneMock.mockReturnValueOnce({
            exec: jest.fn().mockResolvedValue(null)
        });

        const result = await mongoUtils.readOne(filter);

        expect(findOneMock).toHaveBeenCalledWith(filter);
        expect(result).toBeNull();
    });

    it('should read all documents that match the filter', async () => {
        // Arrange
        const filter: FilterQuery<ITodo> = { status: 'pending' };
        const expectedData: ITodo[] = [
            new model({
                title: 'test',
                desc: 'test desc',
                status: 'pending'
            }),
            new model({
                title: 'test2',
                desc: 'test desc2',
                status: 'pending'
            })
        ];
        findMock.mockReturnValueOnce({
            exec: jest.fn().mockResolvedValue(expectedData)
        });

        // Act
        const result = await mongoUtils.readAll(filter);

        // Assert
        expect(findMock).toHaveBeenCalledWith(filter);
        expect(result).toEqual(expectedData);
        expect(result.length).toBe(2);
    });

    it('should return an empty array when no documents match the filter', async () => {
        // Arrange
        const filter: FilterQuery<ITodo> = { status: 'completed' };
        findMock.mockReturnValueOnce({
            exec: jest.fn().mockResolvedValue([])
        });

        // Act
        const result = await mongoUtils.readAll(filter);

        // Assert
        expect(findMock).toHaveBeenCalledWith(filter);
        expect(result).toEqual([]);
        expect(result.length).toBe(0);

    });

    it('should update a document and return the updated document', async () => {
        // Arrange
        const id = 'testId';
        const updateData: UpdateQuery<Partial<ITodo>> = { status: 'completed' };
        const expectedData: ITodo = new model({
            _id: id,
            title: 'test',
            desc: 'test desc',
            status: 'completed'
        });
        findByIdAndUpdateMock.mockReturnValueOnce({
            exec: jest.fn().mockResolvedValue(expectedData)
        });

        // Act
        const result = await mongoUtils.update(id, updateData);

        // Assert
        expect(findByIdAndUpdateMock).toHaveBeenCalledWith(id, updateData, { new: true });
        expect(result).toEqual(expectedData);
    });

    it('should return null when no document match the id', async () => {
        // Arrange
        const id = 'nonexistentId';
        const updateData: UpdateQuery<Partial<ITodo>> = { status: 'completed' };
        findByIdAndUpdateMock.mockReturnValueOnce({
            exec: jest.fn().mockResolvedValue(null)
        });

        // Act
        const result = await mongoUtils.update(id, updateData);

        // Assert
        expect(findByIdAndUpdateMock).toHaveBeenCalledWith(id, updateData, { new: true });
        expect(result).toBeNull();
    });

    it('should delete a document and return the deleted document', async () => {
        // Arrange
        const id = 'testId';
        const expectedData: ITodo = new model({
            _id: id,
            title: 'test',
            desc: 'test desc',
            status: 'completed'
        });
        findByIdAndDeleteMock.mockReturnValueOnce({
            exec: jest.fn().mockResolvedValue(expectedData)
        });

        // Act
        const result = await mongoUtils.delete(id);

        // Assert
        expect(findByIdAndDeleteMock).toHaveBeenCalledWith(id);
        expect(result).toEqual(expectedData);
    });

    it('should return null when no document match the id', async () => {
        // Arrange
        const id = 'nonexistentId';
        findByIdAndDeleteMock.mockReturnValueOnce({
            exec: jest.fn().mockResolvedValue(null)
        });

        // Act
        const result = await mongoUtils.delete(id);

        // Assert
        expect(findByIdAndDeleteMock).toHaveBeenCalledWith(id);
        expect(result).toBeNull();
    });

    it('should delete all documents', async () => {
       // Arrange
       deleteManyMock.mockReturnValueOnce({
           exec: jest.fn().mockResolvedValue({deletedCount: 2})
       });

       // Act
        const result = await mongoUtils.deleteAll();

        // Assert
        expect(deleteManyMock).toHaveBeenCalled();
        expect(result).toEqual({deletedCount: 2});
    });

});