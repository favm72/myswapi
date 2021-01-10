import express from 'express'
import PlanetsBL from '../logiclayer/planetsBL.js'

let router = express.Router()

router.get('/translate/:id', async (req, res, next) => {	
	const result = await PlanetsBL.translate(req.params.id)
	res.status(200).send(result)
})

router.get('/list', async (req, res, next) => {	
	const result = await PlanetsBL.list()
	res.status(200).send(result)
})

router.post('/create', async (req, res, next) => {
	const result = await PlanetsBL.create(req.body)
	res.status(200).send(result)	
})

router.post('/import/:id', async (req, res, next) => {
	const result = await PlanetsBL.import(req.params.id)
	res.status(200).send(result)	
})

export default router;
