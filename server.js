const http = require('http')
const app = require('./app')

const port = process.env.PORT || 5432

const server = http.createServer(app)
server.listen(port, () => console.log(`Running on port ${port}`))