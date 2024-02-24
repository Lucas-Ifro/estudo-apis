// import { createServer } from 'node:http';
// let port = 3004;

// const server = createServer((request, response)=>{
//     response.write('oi')
//     return response.end()
// })

// server.listen(port)

import { fastify } from 'fastify';
import { DatabasePostgres } from './database-postgres.js';

const server = fastify();

const database = new DatabasePostgres();

// GET POST PUT DELETE

// o id é identificado pelo route Parameter

// Request Body


server.post('/videos', async (request, response)=>{
    const {titulo, descricao, duracao} = request.body;

    await database.create({
        titulo,
        descricao,
        duracao,
    })

    return response.status(201).send();
})

server.get('/videos', async (request)=>{
    const search = request.query.search

    const videos = await database.list(search);

    return videos;

})

server.put('/videos/:id', async(request, response)=>{
    const {titulo, descricao, duracao} = request.body;
    const videoId = request.params.id

    await database.update(videoId, {
        titulo,
        descricao,
        duracao,
    })

    return response.status(204).send();
})

server.delete('/videos/:id', (request, response)=>{
    const videoId = request.params.id;

    database.delete(videoId)

    return response.status(204).send();
})

server.listen({
    port: process.env.PORT ?? 3004,
})