import TransactionUtils from '@database/transactionUtils';
import mongoose, { Document, Schema } from 'mongoose';

interface ITestDoc extends Document {
    name: string;
}

const TestSchema: Schema = new Schema({
    name: { type: String, required: true }
});

const TestModel = mongoose.model<ITestDoc>('Test', TestSchema);

const transacionUtils = new TransactionUtils<ITestDoc>(TestModel);

describe('transactionUtils tests', () => {
    const spy = jest.spyOn(TestModel, 'countDocuments');

    it('should create a new document', async () => {
        const model = { create: jest.fn().mockResolvedValue({ name: 'test' }) };
        const item = await transacionUtils.create(model);
        expect(model.create).toHaveBeenCalled();
        expect(item).toEqual({ name: 'test' });


    });
});