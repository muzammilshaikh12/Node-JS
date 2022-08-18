
const http = require('http')
const route = require('./route')
const server =  http.createServer(route.handler)
console.log(route.text)
server.listen(4000)
