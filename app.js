const express = require('express')
const app = express()
const port = 8050;

app.use(express.json())

app.listen(port, () => {
    console.log(`your server start on port number ${port}`)

})