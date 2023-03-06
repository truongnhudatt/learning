const compression = require("compression")
const express = require("express")
const { default: helmet } = require("helmet")
const morgan = require("morgan")
const cors = require("cors")
var bodyParser = require('body-parser')


const initDatabase = require("./databases/init.database")
const router = require("./routes")
const app = express()

app.use(morgan('dev'))
app.use(compression())
app.use(helmet())
app.use(cors())
app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())


app.use("/", router)

module.exports = app
