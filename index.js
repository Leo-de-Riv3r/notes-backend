const express = require('express')
const app = express()
const cors = require('cors')
app.use(express.json())
app.use(cors())
let notes = [
  {
    id: 1,
    content: "HTML is easy",
    important: true
  },
  {
    id: 2,
    content: "Browser can execute only JavaScript",
    important: false
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true
  }
]

app.get('/', (req, res) => {
  res.send('<h1>Helo world</h1>')
})

app.get('/api/notes', (req, res) => {
  res.json(notes)
})

app.get('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id)
  const note = notes.find(note => note.id === id)
  console.log(note)
  res.json(note)

  if (note) {
    res.json(note)
  } else {
    res.status(400).end()
  }
})

app.delete('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id)
  notes = notes.filter(note => note.id !== id)
  res.status(200).end()
})

const generateId = () => {
  const maxId = notes.length > 0 ?
    Math.max(...notes.map(n => n.id))
    : 0
  return maxId + 1
}

app.post('/api/notes', (req, res) => {
  const body = req.body
  console.log(body)
  if (!body.content) {
    return res.status(400).json({
      error: 'content missing in body'
    })
  }
  const note = {
    id: generateId(),
    important: Boolean(body.important) || false,
    content: body.content
  }
  notes = notes.concat(note)
  res.json(note)
})

app.put('api/notes/:id', (req, res) => {
  console.log('smsdlsdsdsd')
  const id = req.params.id
  console.log(req.body)
  res.status(200).end()
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
