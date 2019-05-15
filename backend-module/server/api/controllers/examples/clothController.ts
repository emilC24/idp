import { Request, Response } from 'express';
import mongoose from 'mongoose';
import {Cloth, clothFields} from '../../../models/Cloth'

const mapBodyToCloth = (body: any) => {
    return {
        ...body.cloth,
        type: body.cloth.clothType,
    }
};

export class clothController {
    all(req: Request, res: Response): void {
        mongoose.model('cloth').find(function(err, clothes) {
            res.send(clothes);
        });
    }

    async create(req: Request, res: Response) {
        console.log(req.body);
        const body = JSON.parse(req.body);
        const cloth = mapBodyToCloth(body);
        const existing = await Cloth.findOne({
            type: cloth.type,
            size: cloth.size,
            price: cloth.price
        }).select(clothFields.join(' ')).lean().exec();
        if (existing) {
            const newOne = {count: existing.count + cloth.count};
            console.log("before update");
            console.log(existing);
            console.log(newOne);
            Cloth.findOneAndUpdate({type: cloth.type, size: cloth.size, price: cloth.price}, {$set: newOne}, (err) => {
                if (err) {
                    console.log(err)
                }
                console.log('RESULT');
                res.status(200)
                    .location(`<%= apiRoot %>/clothes/`)
                    .json({...existing, count: existing.count + newOne.count});
            });
            console.log("after update")
        } else {
            Cloth.create(cloth, (err, cloth) => {
                console.log(err)
                res.status(201)
                    .location(`<%= apiRoot %>/clothes/`)
                    .json(cloth)
            });
        }
    }

    decrementCount(req: Request, res: Response): void {
        // Cloth.deleteMany({  });
        const body = JSON.parse(req.body);
        console.log("decrement");
        console.log(body);
        body.cloth.count--;
        Cloth.findByIdAndUpdate(body.cloth._id,
            {$set:body.cloth},
            (err) => {
                if (err) {
                    console.log(err)
                }
                console.log('RESULT');
                res.status(200)
                    .location(`<%= apiRoot %>/clothes/buyOne`)
                    .json(body.cloth);
            }
        );
    }

}


export default new clothController();
