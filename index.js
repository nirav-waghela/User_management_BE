const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const config = require('./configurations/app_config')
const api = require('./routes/api')

app.use(bodyParser.json())
app.use(cors())

app.get('/', (req, res) => {
    res.send('from / route')
})

mongoose.connect(config.databaseUri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => { console.log('Database connected succesfully') })
    .catch(err => { console.log('Database connection Failed') })

app.listen(config.port, function (err) {
    if (err) {
        console.log('Error starting server :', err)
    } else {
        console.log('listening on port :', config.port)
    }
})

app.use('', api)
