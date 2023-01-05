const express = require('express')
const logger = require('morgan')
const cors = require('cors')

/*Роуты*/
const  contactsRouter  = require('./routes/api/contacts')

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

/* После идет блок подключения промежуточного ПО*/
app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())  /*Парсер Json*/

/*подключение роутеров в приложение*/
app.use('/api/contacts', contactsRouter)

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message })
})

module.exports = app

