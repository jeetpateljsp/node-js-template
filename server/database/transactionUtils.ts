import { Document, Model } from 'mongoose';

class TransactionUtils <T extends Document> {
    private model: Model<T>;

    constructor(model: Model<T>) {
        this.model = model;
    }

    create = async  (data: T) => {
        const newDoc = new this.model(data);
        return await newDoc.save();
    }

}

export default TransactionUtils;