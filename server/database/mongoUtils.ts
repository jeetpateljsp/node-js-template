import { Document, Model, FilterQuery, UpdateQuery } from 'mongoose';

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

    readMany = async (filter: FilterQuery<T> = {}): Promise<T[]> => {
        return await this.model.find(filter).exec();
    }

    update = async (id: string, data: UpdateQuery<Partial<T>>): Promise<T | null> => {
        return await this.model.findByIdAndUpdate(id, data, { new: true }).exec();
    };

    delete = async (id: string): Promise<T | null> => {
        return await this.model.findByIdAndDelete(id).exec();
    }

    deleteAll = async () => {
        return await this.model.deleteMany({}).exec();
    }

    count = async (filter: FilterQuery<T> = {}): Promise<number> => {
        return await this.model.countDocuments(filter).exec();
    }

}

export default MongoUtils;