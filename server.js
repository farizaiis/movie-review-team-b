const express = require('express')
const app = express()
const indexRouter = require('./routes/index.routes')
const port = 6000

app.use(express.json())
app.use('/', indexRouter)

app.get('*', function(req,res) {
    res.status(404).send('not found')
})

app.listen(port, () => {
    console.log("🚀 ~ file: server.js ~ line 18 ~ app.listen ~ port", port)
})