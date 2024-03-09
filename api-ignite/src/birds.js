const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

const customers = []

function verifyIfExistsAccountCPF(request, response, next){
    const {cpf} = request.headers;

    const customer = customers.find( (customer) => customer.cpf === cpf)

    if (!customer) {
        return res.status(400).json({Error: "usuário não existe"})
    }

    request.customer = customer;

    return next();
}

function getBulance(statement){
    const balance = statement.reduce((acc, operation) => {
        console.log("cheguei")
        if (operation.type = "credit") {
            return acc + operation.amount;
        } else {
            return acc - operation.amount;
        }
    }, 0)

    return balance;
}

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

router.get('/statement',verifyIfExistsAccountCPF, (req, res)=>{
    const {customer} = req;

    res.json(customer.statement)
})

router.post('/deposit', verifyIfExistsAccountCPF, (req, res) => {
    const {description, amount } = req.body;

    const { customer } = req;

    const statementOperation = {
        description,
        amount,
        date : new Date(),
        type : "credit"
    }

    customer.statement.push(statementOperation)

    return res.status(201).send()
})

router.post('/withdraw', verifyIfExistsAccountCPF, (req, res) => {
    const {amount} = req.body;
    const {customer} = req;
    const saldo = getBulance(customer.statement);
    
    console.log("cheguei")

    if(saldo >= amount){
        const statementOperation = {
            amount,
            date : new Date(),
            type : "debito"
        }
    
        customer.statement.push(statementOperation)

        return res.status(201).send()
    }else{
        return res.status(400).json(error, "o saldo é insuficiente")
    }

})

module.exports = router;

