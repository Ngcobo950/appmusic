const express = require('express');
const router = express.Router();
const fs = require('fs')
const bodyParser = require('body-parser')
const helmet = require('helmet')
const fetch = require('node-fetch')
const app = express()

var favMusic = require('./favoritesMusic.json')
var favBooks = require('./favoritesBooks.json')


app.use(bodyParser.json())
app.use(express.json())
app.use(helmet())


router.get('/music', (req, res) => {
    
    fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(req.query.search)}&limit=10&entity=song`)
        .then(function(res) {
            return res.json()
        })
        .then(function(data) {
            
            res.send(JSON.stringify(data.results))
        })
    console.log(res)
})


router.post('/favoritesMusic', (req, res) => {
    console.log('access')
    favMusic.push(req.body)
    fs.writeFile('favoritesMusic.json', JSON.stringify(favMusic), (err) => {
        if (err) {
            console.log("not working", err)
        } else {
            console.log("yeah")
        }
    })
})

router.get('/favoritesMusic', (req, res) => {
    fs.readFile('./favoritesBooks.json', (err, data) => {
        if (err) {
            console.log('cant read')
        } else {
            res.send(favMusic)
        }
    })
})

router.delete('/favoritesMusic', (req, res) => {
    console.log('access')
    favMusic = favMusic.filter((i) => {
        return i.id != req.body.deleted
    })
    fs.writeFile('favoritesMusic.json', JSON.stringify(favMusic), (err) => {
        if (err) {
            console.log("not working", err)
        } else {
            console.log("yeah")
        }
    })
})


//router for the books 
router.get('/book', (req, res) => {
    fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(req.query.search)}&limit=10&entity=ebook`)
        .then(function(res) {
            return res.json()
        })
        .then(function(data) {
            res.send(JSON.stringify(data.results))
        })
})

router.post('/favoritesBooks', (req, res) => {

    favBooks.push(req.body)
    fs.writeFile('favoritesBooks.json', JSON.stringify(favBooks), (err) => {
        if (err) {
            console.log("not working", err)
        } else {
            console.log("yeah")
        }
    })
})


router.get('/favoritesBooks', (req, res) => {
    fs.readFile('./favoritesBooks.json', (err, data) => {
        if (err) {
            console.log('cant read')
        } else {
            res.send(favBooks)
        }
    })
})
router.delete('/favoritesBooks', (req, res) => {
    console.log('access')
    favBooks = favBooks.filter((i) => {
        return i.id != req.body.deleted
    })
    fs.writeFile('favoritesBooks.json', JSON.stringify(favBooks), (err) => {
        if (err) {
            console.log("not working", err)
        } else {
            console.log("yeah")
        }
    })
})



module.exports = router;