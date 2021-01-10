import connect from './connect.js'
import mongoose from 'mongoose'
import People from './peopleSC.js'

export default class PeopleDA {    
	static async list() {        
		const connected = await connect(mongoose)
		if (!connected)
			throw { message: "No se pudo conectar a la base de datos." }
		const people = await People.find({})
		mongoose.disconnect()
		return people
	}
	static async create(model) {
		const connected = await connect(mongoose)
		if (!connected)
			throw { message: "No se pudo conectar a la base de datos." }        

		const people = new People(model)
		await people.save()
		mongoose.disconnect()
	}
}