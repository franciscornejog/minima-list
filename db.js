const pgp = require('pg-promise')();
const moment = require('moment');
const passport = require('./auth');
const connectionString = 'postgresql://neuan:postgresql@localhost:5432/minimalist';
// const db = pgp('postgres://username:password@host:port/database');
const db = pgp(connectionString);
// create table users(username text not null primary key, password text not null);
// create table items(
// id bigserial not null primary key,
// name varchar(255) not null,
// description varchar(255),
// quantity integer,
// notes varchar(255),
// created timestamp not null default CURRENT_TIMESTAMP,
// author text REFERENCES users
// );

const getCollection = (req, res, next) => {
    const query = 'SELECT * FROM items WHERE author = $1';
    db.manyOrNone(query, [req.user.username])
    .then(data => res.render('collection', {items: data, moment: moment }))
    .catch(err =>  next(err));
}

const createUser = (req, res, next) => {
    const query = 'INSERT INTO users(username, password) VALUES($1, $2)'; 
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
    createUser: createUser,
};
