import express from 'express'
import { logger } from './middlewares/logger.js'

const app = express()
const PORT = 3000

app.use(logger)
app.use(express.urlencoded({ extended: true }))

app.use('/assets', express.static('public'))
app.use('/photos', express.static('public'))

app.get('/', (request, response) => {
    response.send(`
        <h1>Appreciation Wall</h1>
        <p>This is appreciation Wall @CODE!</p>
        `)
})

app.get('/posts', (request, response) =>{
    console.log(request.query)
    response.send('Browse our appreciation wall')
})

app.get('/people/:codeperson', (request, response) => {
  const codeId = request.params.codeperson

  response.send(`These are the posts for ${codeId}`)
})

app.get('/posts/:postId', (request, response) => {
    const postId = request.params.postId

  response.send(`The post ID is ${postId}.`)
})

  app.get('/people/:codeperson/:postId', (request, response) => {
    const codeId = request.params.codeperson
    const postId = request.params.postId

  response.send(`This is an appreciation post for ${codeId} and the post ID is ${postId}.`)
})

app.get('/about', (request, response) =>{
    response.send('<h1>Appreciation Wall</h1><p>Introducing Appreciation Wall @CODE</p>')
})

app.get('/add', (request, response) =>{
    const name = "CODEr"
    const message = `Hello, ${name}!`

    response.send(`${message} Write your appreciation for a CODE community member here!`)
})

app.post('/add', (request, response) =>{
    console.log(`Appreciation submission: `, request.body)
    response.send('Thank you for appreciating our community member!')
})

app.get('/api/v1/posts', (request, response) => {
    response.json({
        posts: [
            {name: 'Tomas Pereda', codeperson: 'tomas-p', message: 'Gracias! For everything, giving a smile every time I come to campus and laughing a little bit! and for your endless help around campus <3', by: 'Cristina', postId: 1},
            {name: 'Simon Gneuss, Lukas Kaiser, Laurin Notemann, Julian Gebhard', message: 'THANKS for the Insane Community work you put in', by:'Jesper', postId: 2},

        ]
    })
})

app.get('/api/v1/posts/:postId', (request, response) => {
    response.json({
        posts: [
            {name: 'Tomas Pereda', codeperson: 'tomas-p', message: 'Gracias! For everything, giving a smile every time I come to campus and laughing a little bit! and for your endless help around campus <3', by: 'Cristina', postId: 1},
            {name: 'Simon Gneuss, Lukas Kaiser, Laurin Notemann, Julian Gebhard', message: 'THANKS for the Insane Community work you put in', by:'Jesper', postId: 2},

        ]
    })
})



app.get('/api/v1/people/:postId', (request, response) => {
    response.json({
        posts: [
            {name: 'Tomas Pereda', codeperson: 'tomas-p', message: 'Gracias! For everything, giving a smile every time I come to campus and laughing a little bit! and for your endless help around campus <3', by: 'Cristina', postId: 1},
            {name: 'Simon Gneuss, Lukas Kaiser, Laurin Notemann, Julian Gebhard', message: 'THANKS for the Insane Community work you put in', by:'Jesper', postId: 2},

        ]
    })
})


app.listen(PORT, () => {
  console.log(`👋 Started server on port ${PORT}`)
})