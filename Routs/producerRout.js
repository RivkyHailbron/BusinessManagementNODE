const express = require('express');
const router = require('express').Router();
const { getProducer,
        postProducer,
        putProducer } = require('../Controllers/ProducerController.js');

router.get('/:email', getProducer);
router.post('/', postProducer);
router.put('/:email', putProducer);

module.exports = router;
