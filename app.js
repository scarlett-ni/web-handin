import express from 'express'
import { logger } from './middlewares/logger.js'
import mongoose from 'mongoose'

const app = express()
const PORT = 3000

mongoose.connect('mongodb+srv://admin:kEkLgwIm0ucsSMvN@appreciationwallcode.3n8uwgv.mongodb.net/appreciationwall?appName=AppreciationWallCODE')
    .then(() => console.log('💽 Database connected'))
    .catch(error => console.error(error))

const postSchema = new mongoose.Schema({
    number: { type: Number, unique: true},
    slug: { type: String, unique: true, required: true },
    name: {type: String, required: true },
    message: {type: String, required: true },
    from: String
})

const Post = mongoose.model('Post', postSchema)



const posts = [
    {number: '1', slug: 'post-1'},
    {number: '2', slug: 'post-2'}
]

posts.forEach(post => {
    '<li>' + post + '</li>'
})

app.set('view engine', 'ejs')

app.use(logger)
app.use(express.urlencoded({ extended: true }))



app.use('/assets', express.static('public'))
app.use('/photos', express.static('public'))

app.get('/', (request, response) => {
    const postNumber = 2
    response.render('index', {postNumber: postNumber})
})

app.get('/posts', (request, response) =>{
    response.render('posts/index', {posts: posts})
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

app.post('/posts', (request, response) => {
    const post = new Post({
        slug: 'post-1',
        number: 1,
        name: 'Tomas Pereda',
        from: 'Cristina',
        message: 'Gracias! For everything, giving a smile every time I come to campus and laughing a little bit! and for your endless help around campus <3',

    })
    post.save()
       .then(() => response.send('Post sent'))
       .catch((error) => response.send('Error: The message could not be sent.'))
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