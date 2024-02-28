const express = require('express');
const router = express.Router();

router.get('/', async function(req, res) {
    await res.send("hello word")
    return res.status(200).send();
})

module.exports = router;

