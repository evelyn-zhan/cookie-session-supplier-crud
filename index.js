import express from 'express'
import Supplier from './models/supplier.js'
import user_controller from './controllers/user.js'
import session from 'express-session'

const app = express()
const hostname = '127.0.0.1'
const port = 3001

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(session({
    secret: 'Ini adalah kode rahasia###',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60 * 60 * 1000 } // 1 hour
}))

app.set('view engine', 'ejs')

app.get('/login', user_controller.login)
app.get('/logout', user_controller.logout)
app.post('/login', user_controller.auth)

app.get('/', (req, res) => {
    Supplier.findAll()
        .then((suppliers) => {
            res.render('index', { suppliers, user: req.session.user || '' })
        })
        .catch((error) => {
            console.log(error)
            res.status(500).send('Internal Server Error')
        })
})

app.get('/create', (req, res) => {
    res.render('create')
})

app.get('/edit/:id', (req, res) => {
    Supplier.findOne({ where: { id: req.params.id } })
        .then((supplier) => {
            res.render('edit', { supplier })
        })
        .catch((error) => {
            console.log(error)
            res.status(500).send('Internal Server Error')
        })
})

app.post('/api/supplier', (req, res) => {
    Supplier.create({ ...req.body, createdBy: req.session.user.username })
        .then((result) => {
            res.status(200).json({
                status: 200,
                error: null,
                response: {
                    id: result.id,
                    createdAt: result.createdAt,
                    updatedAt: result.updatedAt
                }
            })
        })
        .catch((error) => {
            res.status(500).json({ error: error.message })
        })
})

app.put('/api/supplier/:id', (req, res) => {
    Supplier.update({ ...req.body, updatedBy: req.session.user.username }, { where: { id: req.params.id } })
        .then(([affectedRows]) => {
            res.status(200).json({
                status: 200,
                error: null,
                response: [affectedRows]
            })
        })
        .catch((error) => {
            res.status(500).json({ error: error.message })
        })
})

app.delete('/api/supplier/:id', (req, res) => {
    Supplier.destroy({ where: { id: req.params.id } })
        .then((affectedRows) => {
            res.status(200).json({
                status: 200,
                error: null,
                response: affectedRows
            })
        })
        .catch((error) => {
            res.status(500).json({ error: error.message })
        })
})

app.listen(port, () => {
    console.log(`Server running at http://${hostname}:${port}/`)
})
