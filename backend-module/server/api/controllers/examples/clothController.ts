import { Request, Response } from 'express';
import mongoose from 'mongoose';
import {Cloth }from '../../../models/Cloth'

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

    create(req: Request, res: Response): void {
        console.log(req.body);
        const body = JSON.parse(req.body);
        mongoose.model('cloth').create(mapBodyToCloth(body), (err, cloth) => {
            console.log(err)
            res.status(201)
                .location(`<%= apiRoot %>/clothes/`)
                .json(cloth)
        });
    }

    delete(req: Request, res: Response): void {
        Cloth.deleteMany({});
    }

}


export default new clothController();
