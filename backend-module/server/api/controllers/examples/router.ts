import express from 'express';
import controller from './controller'
import clothController from './clothController'

export default express.Router()
    .post('/', controller.create)
    .get('/', controller.all)
    .get('/clothes', clothController.all)
    .post('/clothes', clothController.create);