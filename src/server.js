import  http  from 'node:http'
import { json } from './middlewares/json.js';

const users = []
let userId = 1; 
const server = http.createServer(async(req, res) =>{
     const {method, url } = req
     await  json(req,res)
     
     if(method === 'GET' && url === '/users'){
          return res
          .end(JSON.stringify(users))
     }
     if (method === 'POST' && url === '/users'){
        const {name, email} = req.body
        users.push({
          id: userId++, // Gera um ID incremental
          name,
          email,
      });
          return res.writeHead(201).end()
     }
     
     return res.writeHead(404).end('Deu errado, amigo')
})

server.listen(3333)
