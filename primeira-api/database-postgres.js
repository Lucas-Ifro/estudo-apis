import {sql} from './db.js';
import {randomUUID} from 'node:crypto';

export class DatabasePostgres{

    async list(search){
        let videos;

        if(search){
            console.log(search)
            videos = await sql`
            
            select * from videos where titulo like ${'%'+search + '%'}
        `
        }else{
            videos = await sql`
            select * from videos
        `
        }

        return videos;

    }
    
    async create(video){
        const videosId = randomUUID()
        const {titulo, descricao, duracao} = video

        await sql`insert into videos (id, titulo, descricao, duracao) values (${videosId}, ${titulo}, ${descricao}, ${duracao})`
       
    }

    async update(id, video){
        const {titulo, descricao, duracao} = video

        await sql`update videos set titulo = ${titulo}, descricao = ${descricao}, duracao= ${duracao}, id = ${id}`
    }

    async delete(id){
       await sql`delete from videos where id = ${id}`
    }
}