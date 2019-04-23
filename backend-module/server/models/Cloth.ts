import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export enum ClothType {
    Shirt = "shirt",
    Jeans = "jeans",
    T_shirt = "t_shirt",
}

export enum Size {
    xs = 0,
    s = 1,
    m = 2,
    l = 3,
    xl = 4,
}

const ClothSchema = new Schema({
    type: {
        type: ClothType,
        required: true
    },
    size: {
        type: Size,
        required: true
    },
    price: Number,
});

export const Cloth = mongoose.model('cloth', ClothSchema);