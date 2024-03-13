const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

const customers = []

function verifyIfExistsAccountCPF(request, response, next){
    const {cpf} = request.headers;

    const customer = customers.find( (customer) => customer.cpf === cpf)

    if (!customer) {
        return response.status(400).json({Error: "usuário não existe"})
    }

    request.customer = customer;

    return next();
}

function getBulance(statement){
    const balance = statement.reduce((acc, operation) => {
        
        if (operation.type == "credit") {
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

router.get('/account',verifyIfExistsAccountCPF, (req, res)=>{
    const {customer} = req;

    return res.json(customer)
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

router.get('/statement/date',verifyIfExistsAccountCPF, (req, res)=>{
    const {customer} = req;
    if(customer === undefined){
        return res.json(Error, "Usuario ll")
    }

    const {date} = req.query;

    const dateFormat = new Date(date + " 00:00")

    const statement = customer.statement.filter((statement) => statement.date.toDateString() === 
    new Date(dateFormat).toDateString())

    res.json(statement)
})

router.put("/account",verifyIfExistsAccountCPF, (req, res) => {
    const {name} = req.body;
    const {customer} = req;

    customer.name = name;

    return res.json({message: "Dados do usuário alterados"}).send()
})

router.delete("/account", verifyIfExistsAccountCPF, (req, res) => {
    const {customer} = req;

    customers.splice(customer, 1)

    return res.json(customers)
})

router.get("/balance", verifyIfExistsAccountCPF, (req, res) => {
    const {customer} = req;

    const balance = getBulance(customer.statement)

    return res.json(balance)
})

module.exports = router;

