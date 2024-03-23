const mongoose = require('mongoose')
mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

console.log(`connected to ${url}`)

mongoose.connect(url)
  .then(res => {
    console.log('connected to MongoDB')
  })
  .catch((err) => {
    console.log('error connecting to MongoDB: ', err.message)
  })

  const noteSchema = new mongoose.Schema({
    content: {
      type: String,
      minLength: 5,
      require: true
    },
    important: Boolean,
  })

noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Note', noteSchema)
  