import mongoose, { Document, Schema } from 'mongoose';

export interface IBins {
    name: String;
    weight: Number;
    fullness: Number;
    location: Array<Float32Array>;
    online: boolean;
}

export interface IBinsModel extends IBins, Document {}

const BinSchema: Schema = new Schema(
    {
        //add (, required: true) if you want to make it not allowed to be empty.
        name: {type: String},
        weight: {type: Number},
        fullness: {type: Number},
        location: {type: Array<Float32Array>},
        online: {type: Boolean},
    },
    {
        timestamps: true,
        versionKey: false
    }
)

export default mongoose.model<IBinsModel>('Bins', BinSchema);