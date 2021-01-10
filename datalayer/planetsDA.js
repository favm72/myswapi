import connect from './connect.js'
import mongoose from 'mongoose'
import Planet from './planetSC.js'

export default class PlanetsDA {    
	static async list() {        
		const connected = await connect(mongoose)
		if (!connected)
			throw { message: "No se pudo conectar a la base de datos." }
		const planets = await Planet.find({})
		mongoose.disconnect()
		return planets
	}
	static async create(model) {
		const connected = await connect(mongoose)
		if (!connected)
			throw { message: "No se pudo conectar a la base de datos." }        

		const planet = new Planet(model)
		await planet.save()
		mongoose.disconnect()
	}
}