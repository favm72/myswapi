import axios from 'axios'
import { baseURL } from '../constants.js'
import PeopleDA from '../datalayer/peopleDA.js'

export default class PeopleBL {
	static async translate(id) {
		try {
			const response = await axios.get(`${baseURL}people/${id}`)
			const data = response.data
			const people = {}
			people.idSwapi = +id   
			people.naves = data.starships
			people.edicion = data.edited
			people.nombre = data.name
			people.creacion = data.created
			people.url = data.url
			people.genero = data.gender
			people.vehiculos = data.vehicles
			people.colorPiel = data.skin_color
			people.colorCabello = data.hair_color
			people.altura = data.height
			people.colorOjo = data.eye_color
			people.masa = data.mass
			people.peliculas = data.films
			people.especies = data.species
			people.planetaOrigen = data.homeworld
			people.anioNacimiento = data.birth_year

			return {
				status: true,
				data: people
			}
		} catch (error) {
			return {
				status: false,
				message: error.message
			}
		}
	}

	static async list() {
		try {
			const people = await PeopleDA.list()
			return {
				status: true,
				data: people
			}
		} catch (error) {
			return {
				status: false,
				message: error.message
			}
		}
	}

	static async create(model) {
		try {
			for (const field of [				
				"nombre", "url", "genero", 
				"colorPiel", "colorCabello", "altura", 
				"colorOjo", "masa", "planetaOrigen", "anioNacimiento" ]) {
					if (model[field] == null)
						throw { message: `Especificar el campo: ${field}.` }
					if (typeof model[field] !== "string")
						throw { message: `El campo: ${field} debe ser de tipo string.` }
			}

			for (const field of [ "peliculas", "naves", "vehiculos", "especies" ]) {
				if (model[field] == null)
					throw { message: `Especificar el campo: ${field}.` }
				if (!Array.isArray(model[field]))
					throw { message: `El campo: ${field} debe ser de tipo arreglo.` }
			}
			
			model.creacion = new Date()
			model.edicion = new Date()
			model.idSwapi = 0

			await PeopleDA.create(model)
			return { 
				status: true,
				message: "Persona registrada correctamente"		
			}
		} catch (error) {
			return { 
				status: false,
				message: error.message		
			}
		}	
	}

	static async import(id) {
		try {		
			const res = await this.translate(id)
			if (!res.status)
				throw { message: res.message }
			
			const model = res.data

			await PeopleDA.create(model)
			return { 
				status: true,
				message: "Persona importada correctamente"		
			}
		} catch (error) {
			return { 
				status: false,
				message: error.message		
			}
		}	
	}	
}