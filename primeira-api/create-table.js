import {sql} from './db.js';

sql`drop table if exists videos`.then(()=>{
    console.log('tabela apagada')
})

sql`
    CREATE TABLE videos(
        id TEXT PRIMARY KEY,
        titulo TEXT,
        descricao TEXT,
        duracao INTEGER
    );
`.then(()=>{
    console.log("tabela criada")
})