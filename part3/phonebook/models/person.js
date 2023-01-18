const mongoose = require('mongoose')

// connect or Create a PhoneBookApp database (Collection)
const url = process.env.MONGODB_URI

mongoose.connect(url)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })


// create a schema
const PersonSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true,
    unique: true,
  },
  number: {
    type: String,
    minLength: 8,
    required: true,
    validate: {
      validator: function (num) {
        return /\d{2,3}-\d{7,}/.test(num)
      }
    }

  }
})

// transform toJSON method 
PersonSchema.set('toJSON', {
  'transform': (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', PersonSchema)
