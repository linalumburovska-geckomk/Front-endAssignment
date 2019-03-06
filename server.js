const express = require('express')
const path = require('path')
const app = express()


app.use('/', express.static(path.join(__dirname, './dist')))

app.get('/*', function(request, response) {
    response.sendFile(path.join(__dirname + '/dist/index.html'));
})

app.listen(3000, () => console.log('App listening on port 3000!'))