const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
    
    return res.json({message: "hello word"})
})

router.get('/courses', (req, res)=>{
    return res.json({cursos: {
        1: "curso1",
        2: "curso2",
        3: "curso3"
    }})
}) 

module.exports = router;

