import express from 'express'
import bodyParser from 'body-parser'
import path from 'path'
import cors from 'cors'
import planetsRouter from './routes/planetsR.js'
import peopleRouter from './routes/peopleR.js'

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(path.resolve(), 'public')))

app.get("/", (req, res) => {
    res.status(200).send({ response: true })
})

app.use("/planets", planetsRouter)
app.use("/people", peopleRouter)

app.use((req, res, next) => {
    next(res.status(404).send({ message: "Recurso no encontrado" }))
})

var port = process.env.PORT || '3000';
app.set('port', port);

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})
