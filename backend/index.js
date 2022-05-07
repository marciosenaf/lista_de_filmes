// config inicial
const express = require('express')
const cors = require('cors')
const app = express()
//cors

app.use((req, res, next) =>{
res.header("Access-Control-Allow-Origin", "*"); 
app.use(cors());
next();
});

// depois do db
const mongoose = require('mongoose')

const Person = require('./models/Person')

app.use(
  express.urlencoded({
    extended: true,
  }),
)

app.use(express.json())

// rotas
app.post('/person', async (req, res) => {
  const {poster, titulo, genero, enredo, nota} = req.body

  const person = {
    poster,
    titulo,
    genero,
    enredo,
    nota
  }

  try {
    await Person.create(person)

    res.status(201).json({ message: 'Filme inserido no sistema com sucesso!' })
  } catch (error) {
    res.status(500).json({ erro: error })
  }
})

app.get('/person', async (req, res) => {
  try {
    const people = await Person.find()

    res.status(200).json(people)
  } catch (error) {
    res.status(500).json({ erro: error })
  }
})

app.get('/person/:id', async (req, res) => {
  const id = req.params.id

  try {
    const person = await Person.findOne({ _id: id })

    if (!person) {
      res.status(422).json({ message: 'Filme não encontrado!' })
      return
    }

    res.status(200).json(person)
  } catch (error) {
    res.status(500).json({ erro: error })
  }
})

app.patch('/person/:id', async (req, res) => {
  const id = req.params.id

  const {poster, titulo, genero, enredo, nota} = req.body

  const person = {
    poster,
    titulo,
    genero,
    enredo,
    nota
  }

  try {
    const updatedPerson = await Person.updateOne({ _id: id }, person)

    if (updatedPerson.matchedCount === 0) {
      res.status(422).json({ message: 'Filme não encontrado!' })
      return
    }

    res.status(200).json(person)
  } catch (error) {
    res.status(500).json({ erro: error })
  }
})

app.delete('/person/:id', async (req, res) => {
  const id = req.params.id

  const person = await Person.findOne({ _id: id })

  if (!person) {
    res.status(422).json({ message: 'Filme não encontrado!' })
    return
  }

  try {
    await Person.deleteOne({ _id: id })

    res.status(200).json({ message: 'Filme removido com sucesso!' })
  } catch (error) {
    res.status(500).json({ erro: error })
  }
})

app.get('/', (req, res) => {
  res.json({ message: 'Oi Express!' })
})

// entregar uma porta

mongoose.connect('mongodb+srv://usuario:usuario@apicluster.mgq95.mongodb.net/bancodaapi?retryWrites=true&w=majority')
.then(() => {
    console.log("conectamos ao mongodb")
    app.listen(3030)
})
.catch((err) => console.log (err) )
