import mongoose, {Schema, Document} from 'mongoose';

interface ITodo extends Document {
    title: string,
    desc: string;
    status: 'pending' | 'ongoing' | 'completed';
    createdAt: Date;
    updatedAt: Date;
}

const TodoSchema = new Schema({
    title: {type: String, required: true},
    desc: {type: String, required: true},
    status: {type: String, enum: ['pending', 'ongoing', 'completed'], default: 'pending'},
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now}
});

TodoSchema.pre<ITodo>('save', function(next) {
    const now = new Date();
    if(!this.createdAt) {
        this.createdAt = now;
    }
    this.updatedAt = now;
    next();
});

const TodoModel = mongoose.model<ITodo>('Todo', TodoSchema);

export default {
    TodoModel,
    TodoSchema
};