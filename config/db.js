const mongoose = require('mongoose')

const connectDB = async () => {
  const connection = await mongoose
    .connect(process.env.MONGO_URI, { useUnifiedTopology: true })
    .then(() => console.log('Mongo db connected'))
    .catch((err) => console.log(err.reason))
}

module.exports = connectDB
