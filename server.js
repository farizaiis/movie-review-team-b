const express = require('express')
const multer = require('multer')
const cors = require('cors')
const app = express()
const form = multer()
const indexRouter = require('./routes/index.routes')

dotenv.config()
const port = process.env.PORT || 8080
const env = process.env.NODE_ENV || "development"

app.use(form.array())
app.use(express.json())
app.use(cors())
app.use('/', indexRouter)

app.get('*', function(req,res) {
    res.status(404).send('not found')
})

app.listen(port, () => {
    console.log("🚀 ~ file: server.js ~ line 18 ~ app.listen ~ port", port)
})