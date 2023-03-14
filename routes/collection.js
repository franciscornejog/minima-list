const express = require('express');
const router = express.Router();
const auth = require('../auth');
const db = require('../db');

router.get('/', auth.verify, db.getCollection);
// router.post('/', auth, db.createItem);

router.get('/new', auth.verify, (req, res) => res.render('collection/new'));

router.get('/:id', auth.verify, db.getItem);
// router.delete('/:id', auth, db.removeItem);

// router.get('/:id/edit', auth, db.updateItem);

module.exports = router;
