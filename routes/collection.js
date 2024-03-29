const express = require('express');
const router = express.Router();
const auth = require('../auth');
const db = require('../db');

router.get('/', auth.verify, db.getCollection);
router.post('/', auth.verify, db.createItem);

router.get('/new', auth.verify, (req, res) => res.render('collection/new'));

router.get('/:id', auth.verify, db.getItem);
router.delete('/:id', auth.verify, db.deleteItem);
router.put('/:id', auth.verify, db.updateItem);

router.get('/:id/edit', auth.verify, db.getItemToEdit);

router.post('/:id/reset', auth.verify, db.updateDate);

router.use((err, req, res, next) => {
    req.flash('error', err.message);
    res.redirect('/collection');
});

module.exports = router;
