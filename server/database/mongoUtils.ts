import { Document, Model, FilterQuery } from 'mongoose';

class MongoUtils<T extends Document> {
    private model: Model<T>;

    constructor(model: Model<T>) {
        this.model = model;
    }

    create = async (data: Partial<T>): Promise<T> => {
        const newDoc = new this.model(data);
        return await newDoc.save();
    }

    readOne = async (filter: FilterQuery<T> = {}): Promise<T | null> => {
        return await this.model.findOne(filter).exec();
    }


}

export default MongoUtils;