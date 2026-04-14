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





app.set('view engine', 'ejs')

app.use(logger)
app.use(express.urlencoded({ extended: true }))


app.use('/assets', express.static('public'))
app.use('/photos', express.static('public'))

app.get('/', (request, response) => {
    const postNumber = 2
    response.render('index', {postNumber: postNumber})
})

app.get('/posts', async (request, response) =>{
    try {
        const posts = await Post.find({}).exec()

        response.render('posts/index', {
            posts: posts})
        
    }catch(error) {
        console.error(error)
        response.render('posts/index', {
            posts: []
        })
    }
})

app.get('/posts/new', (request, response) => {
    response.render('posts/new')

})

app.get('/posts/:slug',async (request, response) => {
    try {
    const slug = request.params.slug
    const post = await Post.findOne({ slug:slug }).exec()
    if(!post) throw new Error('Post not found')

    response.render('posts/show', {
        post: post
    })
    }catch(error) {
        console.error(error)
        response.status(404).send('Could not find the post you\'re looking for.')
    }

})

app.get('/posts/:slug/edit',async (request, response) => {
    try {
    const slug = request.params.slug
    const post = await Post.findOne({ slug:slug }).exec()
    if(!post) throw new Error('Post not found')

    response.render('posts/edit', {
        post: post
    })
    }catch(error) {
        console.error(error)
        response.status(404).send('Could not find the post you\'re looking for.')
    }

})


app.post('/posts', (request, response) => {
    const post = new Post({
        slug: request.body.slug,
        number: request.body.number,
        name: request.body.name,
        from: request.body.from,
        message: request.body.message,

    })
    post.save()
       .then(() => response.send('Post sent'))
       .catch((error) => response.send('Error: The message could not be sent.'))
})

app.post('/cookie/:slug', async (request, response) => {
    try {
        const post = await Post.findOneAndUpdate(
      { slug: request.params.slug }, 
      request.body
    )
    
  }catch (error) {
    console.error(error)
    response.send('Error: The post could not be updated.')
  }
})

app.post('/cookie/:slug', async (request, response) => {
    try {
        const post = await Post.findOneAndUpdate(
      { slug: request.params.slug }, 
      request.body,
      { new: true }
    )
    response.redirect(`/posts/$post.slug}`)
  }catch (error) {
    console.error(error)
    response.send('Error: The post could not be created.')
  }
})






app.get('/people/:codeperson', (request, response) => {
  const codeId = request.params.codeperson

  response.send(`These are the posts for ${codeId}`)
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




app.listen(PORT, () => {
  console.log(`👋 Started server on port ${PORT}`)
})