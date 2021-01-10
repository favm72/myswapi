import express from 'express'
import PeopleBL from '../logiclayer/peopleBL.js'

let router = express.Router()

router.get('/translate/:id', async (req, res, next) => {	
	const result = await PeopleBL.translate(req.params.id)
	res.status(200).send(result)
})

router.get('/list', async (req, res, next) => {	
	const result = await PeopleBL.list()
	res.status(200).send(result)
})

router.post('/create', async (req, res, next) => {
	const result = await PeopleBL.create(req.body)
	res.status(200).send(result)	
})

router.post('/import/:id', async (req, res, next) => {
	const result = await PeopleBL.import(req.params.id)
	res.status(200).send(result)	
})

export default router;
