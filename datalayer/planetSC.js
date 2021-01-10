import mongoose from 'mongoose'

const planetSchema = mongoose.Schema({
    id: mongoose.Types.ObjectId,
    idSwapi: Number,
    diametro: String,
    clima: String,
    superficieAcuatica: String,
    nombre: String,
    creacion: Date,
    url: String,
    periodoRotacion: String,
    edicion: Date,
    terreno: String,
    gravedad: String,
    periodoOrbital: String,
    peliculas: Array,
    habitantes: Array,
    poblacion: String
})

export default mongoose.model('Planet', planetSchema)