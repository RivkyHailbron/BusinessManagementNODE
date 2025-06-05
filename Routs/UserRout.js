const express = require('express');
const router = require('express').Router();
const { getUser,
        postUser,
        putUser } = require('../Controllers/UserController.js');

router.get('/:email', getUser);
router.post('/', postUser);
router.put('/:email', putUser);

module.exports = router;
