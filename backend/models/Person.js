const mongoose = require ('mongoose')
const { stringify } = require('nodemon/lib/utils')

const Person = mongoose.model('Person', {
    poster: String,
    titulo: String,
    genero: String,
    enredo: String,
    nota: String
})

module.exports = Person

