import axios from 'axios'
import { baseURL } from '../constants.js'
import PlanetsDA from '../datalayer/planetsDA.js'

export default class PlanetsBL {
	static async translate(id) {
		try {
			const response = await axios.get(`${baseURL}planets/${id}`)
			const data = response.data
			const planet = {}
			planet.idSwapi = +id   
			planet.diametro = data.diameter
			planet.clima = data.climate
			planet.superficieAcuatica = data.surface_water
			planet.nombre = data.name
			planet.creacion = data.created
			planet.url = data.url
			planet.periodoRotacion = data.rotation_period
			planet.edicion = data.edited
			planet.terreno = data.terrain
			planet.gravedad = data.gravity
			planet.periodoOrbital = data.orbital_period,
			planet.peliculas = data.films,
			planet.habitantes = data.residents,
			planet.poblacion = data.population

			return {
				status: true,
				data: planet
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
			const planets = await PlanetsDA.list()
			return {
				status: true,
				data: planets
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
				"diametro", "clima", "superficieAcuatica", 
				"nombre", "url", "periodoRotacion", 
				"terreno", "gravedad", "periodoOrbital", "poblacion" ]) {
					if (model[field] == null)
						throw { message: `Especificar el campo: ${field}.` }
					if (typeof model[field] !== "string")
						throw { message: `El campo: ${field} debe ser de tipo string.` }
			}

			for (const field of [ "peliculas", "habitantes" ]) {
				if (model[field] == null)
					throw { message: `Especificar el campo: ${field}.` }
				if (!Array.isArray(model[field]))
					throw { message: `El campo: ${field} debe ser de tipo arreglo.` }
			}
			
			model.creacion = new Date()
			model.edicion = new Date()
			model.idSwapi = 0

			await PlanetsDA.create(model)
			return { 
				status: true,
				message: "Planeta registrado correctamente"		
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

			await PlanetsDA.create(model)
			return { 
				status: true,
				message: "Planeta importado correctamente"		
			}
		} catch (error) {
			return { 
				status: false,
				message: error.message		
			}
		}	
	}	
}