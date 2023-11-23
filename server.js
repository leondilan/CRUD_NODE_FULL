const flash = require('express-flash')
const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const routeUser=require('./routes/user')
const db=require('./database/db')
const session = require('express-session')

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.set('trust proxy', 1) // trust first proxy
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))
if (app.get('env') === 'production') {
    app.set('trust proxy', 1) // trust first proxy
    app.use(session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: true }
    }))
}
app.use(flash());

app.use('/user', routeUser)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})