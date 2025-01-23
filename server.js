require ('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Verbindung zur Datenbank'))

app.use(express.json())

const router = require('./routes/mitglieder')
app.use(`/mitglieder`, router)


app.listen(3000, () => console.log('Server gestartet'))