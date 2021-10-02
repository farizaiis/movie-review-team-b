const express = require('express')
const cors = require('cors')
const app = express()
const indexRouter = require('./routes/index.routes')

const port = process.env.PORT || 1107

//mas rizky pakai 8080

app.use(express.json())
app.use(cors())
app.use('/', indexRouter)

app.get("/", (req,res)=>{
    res.json({
        message:"server running",
        serverTime: new Date()
    })
})

app.get('*', function(req,res) {
    res.status(404).send('not found')
})

app.listen(port, () => {
    console.log("🚀 ~ file: server.js ~ line 18 ~ app.listen ~ port", port)
})