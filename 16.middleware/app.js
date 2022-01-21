const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const morgan = require('morgan')
const app = express()
const port = 3000

// menggunakan EJS
app.set('view engine', 'ejs')

// Third-party middleware
app.use(expressLayouts)
app.use(morgan('dev'))

// Built in middleware
app.use(express.static('public'))

// Application level middleware
app.use(function (req, res, next) {
  console.log('Time:', Date.now())
  next()
})

app.get('/', (req, res) => {
  const nama = 'Kucing'
  const title = 'Halaman Home'
  const mahasiswa = [
    {
      nama: 'Kucing',
      warna: 'Oren'
    },
    {
      nama: 'Kucing',
      warna: 'Kelabu'
    }
  ]
  const layout = 'layouts/main-layouts'
  res.render('index', {nama, title, mahasiswa, layout})
})

app.get('/about', (req, res) => {
  const title = 'Halaman About'
  const layout = 'layouts/main-layouts'
  res.render('about', {title, layout})
})
app.get('/contact', (req, res) => {
  const title = 'Halaman Contact'
  const layout = 'layouts/main-layouts'
  res.render('contact', {title, layout})
})
app.get('/product/:id', (req, res) => {
    res.send(`Product ID : ${req.params.id} <br> Category : ${req.query.category}`)
})
app.get('/api', (req, res) => {
    res.json({
        nama: 'Kucing'
    })
})

app.use('/', (req, res) => {
    res.status(404)
    res.send('404')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
