const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    res.json([{
        name: 'Make bed',
        isDone: false
    }]);
});
  
router.get('/:id', (req, res) => {
    const {id} = req.params;
    res.json([{
        id: parseInt(id),
        name: 'Make bed',
        isDone: false
    }]);
});

module.exports = router;