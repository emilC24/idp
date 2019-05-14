import express from 'express';
import clothController from "./clothController";

export default express.Router()
    .get('/', clothController.all)
    .post('/', clothController.create);