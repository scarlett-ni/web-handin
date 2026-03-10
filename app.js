import express from 'express'
import { logger } from './middlewares/logger.js'

const app = express()
const PORT = 3000

app.use(logger)
app.use(express.urlencoded({ extended: true }))

app.use('/assets', express.static('public'))
app.use('/photos', express.static('public'))

app.get('/', (request, response) => {
    response.send('This is appreciation Wall @CODE!')
})

app.get('/posts', (request, response) =>{
    console.log(request.query)
    response.send('Browse our appreciation wall')
})

app.get('/posts/:codeperson', (request, response) => {
  const codeId = request.params.codeperson

  response.send(`These are the posts for ${codeId}`)
})

app.get('/posts/:codeperson/:postId', (request, response) => {
    const codeId = request.params.codeperson
    const postId = request.params.postId

  response.send(`This is an appreciation post for ${codeId} and the post ID is ${postId}.`)
})
app.get('/about', (request, response) =>{
    response.send('Introducing Appreciation Wall @CODE')
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




app.listen(PORT, () => {
  console.log(`👋 Started server on port ${PORT}`)
})