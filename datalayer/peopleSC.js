import mongoose from 'mongoose'

const peopleSchema = mongoose.Schema({
	id: mongoose.Types.ObjectId,
	idSwapi: Number,
	naves: Array,    
	edicion: Date,
	nombre: String,
	creacion: Date,
	url: String,
	genero: String,
	vehiculos: Array,
	colorPiel: String,
	colorCabello: String,
	altura: String,
	colorOjo: String,
	masa: String,
	peliculas: Array,
	especies: Array,
	planetaOrigen: String,
	anioNacimiento: String
})

export default mongoose.model('People', peopleSchema)