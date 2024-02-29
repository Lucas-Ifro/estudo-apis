const http = require("http")
const port = 3333;

const server = http.createServer((req, res)=>{
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Ola mundo')
})

server.listen(port, ()=>{
    console.log(`servidor rodando http://localhost:${port}`)
})

// sudo kill -9 $(sudo lsof -t -i:a porta que deseja matar)