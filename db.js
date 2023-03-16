const pgp = require('pg-promise')();
const moment = require('moment');
const passport = require('./auth');
const connectionString = 'postgresql://neuan:postgresql@localhost:5432/minimalist';
// const db = pgp('postgres://username:password@host:port/database');
const db = pgp(connectionString);
// create table users(username text not null primary key, password text not null);
// create table items(
// id serial primary key,
// name text not null,
// description text,
// quantity integer,
// notes text,
// created timestamp not null default CURRENT_TIMESTAMP,
// author text REFERENCES users
// );

const getCollection = (req, res, next) => {
    const query = 'SELECT * FROM items WHERE author = $1;';
    db.manyOrNone(query, [req.user.username])
    .then(data => res.render('collection', {items: data, moment: moment }))
    .catch(err => next(err));
}

const getItem = (req, res, next) => {
    const query = 'SELECT * FROM items WHERE id = $1;';
    db.one(query, [req.params.id])
    .then(data => res.render('collection/show', { item: data, moment: moment }))
    .catch(err => {
        req.flash('error', err.message);
        res.redirect('/collection');
        next(err);
    });
}

const getItemToEdit = (req, res, next) => {
    const query = 'SELECT * FROM items WHERE id = $1;';
    db.one(query, [req.params.id])
    .then(data => res.render('collection/edit', { item: data, moment: moment }))
    .catch(err => {
        req.flash('error', err.message);
        res.redirect('/collection');
        next(err);
    });
}

const createItem = (req, res, next) => {
    const description = req.body.description || '';
    const quantity = req.body.quantity ? parseInt(req.body.quantity) : 0;
    const notes = req.body.notes || '';
    const query = 'INSERT INTO items(name, description, quantity, notes, author) VALUES($1, $2, $3, $4, $5);'
    db.none(query, [req.body.name, description, quantity, notes, req.user.username])
    .then(() => res.redirect('/collection'))
    .catch(err => {
        req.flash('error', err.message);
        next(err);
    });
}

const updateItem = (req, res, next) => {
    const description = req.body.description || '';
    const quantity = req.body.quantity ? parseInt(req.body.quantity) : 0;
    const notes = req.body.notes || '';
    const query = 'UPDATE items SET name = $1, description = $2, quantity = $3, notes = $4 WHERE id = $5;';
    db.none(query, [req.body.name, description, quantity, notes, req.params.id])
    .then(() => res.redirect('/collection/' + req.params.id))
    .catch(err => {
        req.flash('error', err.message);
        res.redirect('/collection');
        next(err);
    });
}

const updateDate = (req, res, next) => {
    const query = 'UPDATE items SET created = CURRENT_TIMESTAMP WHERE id = $1;';
    db.none(query, [req.params.id])
    .then(() => res.redirect('/collection'))
    .catch(err => {
        req.flash('error', err.message);
        res.redirect('/collection');
        next(err);
    });
}


const deleteItem = (req, res, next) => {
    const query = 'DELETE FROM items WHERE id = $1;';
    db.none(query, [req.params.id])
    .then(() => {
        req.flash('success', 'item deleted');
        res.redirect('/collection');
    })
    .catch(err => {
        req.flash('error', err.message);
        res.redirect('/collection');
    });
}

const createUser = (req, res, next) => {
    const query = 'INSERT INTO users(username, password) VALUES($1, $2);'; 
    db.none(query, [req.body.username, req.body.password])
    .then(() => passport.auth(req, res))
    .catch(err => {
        req.flash('error', err.message);
        res.redirect('/signup');
        next(err);
    });
}

module.exports = {
    db: db,
    getCollection: getCollection,
    getItem: getItem,
    getItemToEdit: getItemToEdit,
    createItem: createItem,
    updateItem: updateItem,
    deleteItem: deleteItem,
    updateDate: updateDate,
    createUser: createUser,
};
