const express = require('express')
const app = express()
const tasks = require('./routes/tasks')
const connectDB = require('./db/connect')
require('dotenv').config()

const PORT = 3000

app.use(express.json())

app.use('/api/v1/tasks', tasks)

app.get('/', (req, res) => {
  res.send('Building Task manager app')
})

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    console.log('DB is connected')
    app.listen(PORT, () => console.log('Server is listening on port ', PORT))
  } catch (error) {
    console.error(error)
  }
}

start()
