import ExamplesService from '../../services/examples.service';
import { Request, Response } from 'express';
import mongoose from 'mongoose';

export class clothController {
    all(req: Request, res: Response): void {
        console.log('adsfadsfASDFADFAasdf')
        mongoose.model('cloth').find(function(err, clothes) {
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
}
export default new clothController();
