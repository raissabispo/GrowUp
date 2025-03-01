import  http  from 'node:http'


const server = http.createServer((req, res) =>{
     return res.end('OPAAAAAAAAAAAAAAAAAAAAAAAAAAAAA')
})

server.listen(3333)
