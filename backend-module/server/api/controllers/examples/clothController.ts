import { Request, Response } from 'express';
import mongoose from 'mongoose';
import {Cloth }from '../../../models/Cloth'

export class clothController {
    all(req: Request, res: Response): void {
        console.log("ASDSADSA");
        mongoose.model('cloth').find(function(err, clothes) {
            console.log("BJJFJFJFJJF")
            res.send(clothes);
        });
    }

    create(req: Request, res: Response): void {
        mongoose.model('cloth').create(req.body.cloth, (err, cloth) => {
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
