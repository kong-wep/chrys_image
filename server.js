import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import api from './api.js'
import { assets_dir } from './env.js'

const app = express()
const port = 3001

app.use(cors()) // allow CORS for all requests
app.use(bodyParser.json()) // parse application/json

app.use('/images',express.static(assets_dir))

app.use('/api',api)

app.listen(port,()=>{
    console.log(`Listening on port ${port}`)
})
