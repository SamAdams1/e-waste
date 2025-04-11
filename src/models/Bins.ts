import mongoose, { Document, Schema } from 'mongoose';

export interface IBins {
    weight: Number;
    fullness: Number;
    location: GeolocationCoordinates;
    online: boolean;
}

export interface IBinsModel extends IBins, Document {}

const BinSchema: Schema = new Schema(
    {
        //add (, required: true) if you want to make it not allowed to be empty.
        weight: {type: Number},
        fullness: {type: Number},
        location: {type: GeolocationCoordinates},
        online: {type: Boolean},
    },
    {
        timestamps: true,
        versionKey: false
    }
)

export default mongoose.model<IBinsModel>('Ewaste', BinSchema);