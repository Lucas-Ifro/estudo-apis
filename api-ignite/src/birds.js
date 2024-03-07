const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

const customers = []

router.get('/', (req, res)=>{
    return res.json({message: "bem vindo ao banco UL"})
})

router.get('/account/', (req, res)=>{
    const {id} = req.params
    return res.json(customers[id] || customers)
})

router.post('/account', (req, res)=>{
    const {cpf, name} = req.body;

    const customersExist = customers.some( (customer) => customer.cpf === cpf)

    if(customersExist){
        return res.status(400).json({Error: "Cpf já cadastrado"})
    }
    customers.push({
        cpf,
        name,
        id: uuidv4(),
        statement: []
    })

    return res.status(201).send()
})

router.get('/statement', (req, res)=>{
    const {cpf} = req.headers;

    const customer = customers.find( (customer) => customer.cpf === cpf)

    if (!customer) {
        return res.status(400).json({Error: "usuário não existe"})
    }

    res.json(customer.statement)
})

module.exports = router;

