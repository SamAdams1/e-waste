import mongoose, { Document, Schema } from 'mongoose';

export interface IEwaste {
    _id: string;
    type: string;
    weight: number;
    battery: boolean;
    data_wiped: boolean;
    bin: number;
}

export interface IEwasteModel extends IEwaste, Document {
    _id: string;
}

const EwasteSchema: Schema = new Schema(
    {
        //add (, required: true) if you want to make it not allowed to be empty.
        type: { type: String },
        weight: { type: Number },
        battery: { type: Boolean },
        data_wiped: { type: Boolean },
        bin: { type: Number }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

export default mongoose.model<IEwasteModel>('Ewaste', EwasteSchema);