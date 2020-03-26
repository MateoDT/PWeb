const express = require('express');

const BooksService = require('./services.js');
const { validateFields } = require('../utils');
const { ServerError } = require('../errors');

const router = express.Router();

//GET /books -> toate cartile (cu numele si prenumele autorului)
router.get('/', async (req, res, next) => {

    try {

        const books = await BooksService.getAll();
        res.json(books);

    } catch (err) {
        next(err);
    }
});

//GET /books/:id -> cartea cu id-ul dat plus numele si prenumele autorului
router.get('/:id', async (req, res, next) => {
    const {
        id
    } = req.params;
    
    try {

        validateFields({
            id: {
                value: id,
                type: 'int'
            }
        });

        const author = await BooksService.getById(parseInt(id));
        res.json(author);

    } catch (err) {
        next(err);
    }
});

//POST /books -> inserare carte cu nume si id-ul autorului 
router.post('/', async (req, res, next) => {
    const {
        name,
        author_id
    } = req.body;

    try {

        const fieldsToBeValidated = {
            name: {
                value: name,
                type: 'ascii'
            },
            author_id: {
                value: author_id,
                type: 'int'
            }
        };

        validateFields(fieldsToBeValidated);

        await BooksService.add(name, parseInt(author_id));
        res.status(201).send("S-a produs inserarea").end();
    } catch (err) {
        next(err);
    }
});

//PUT /books/:id -> actualizare campuri carte cu id-ul dat (name, author_id)
router.put('/:id', async (req, res, next) => {
    const {
        id
    } = req.params;
    const {
        name,
        author_id
    } = req.body;

    try {

        const fieldsToBeValidated = {
            id: {
                value: id,
                type: 'int'
            },
            name: {
                value: name,
                type: 'ascii'
            },
            author_id: {
                value: author_id,
                type: 'int'
            }
        };

        validateFields(fieldsToBeValidated);

        await BooksService.updateById(parseInt(id), name, parseInt(author_id));
        res.status(200).send("Actualizare reusita").end();

    } catch (err) {
        next(err);
    }
});

//DELETE /books/:id -> sterge cartea cu id-ul dat
router.delete('/:id', async (req, res, next) => {
    const {
        id
    } = req.params;

    try {

        validateFields({
            id: {
                value: id,
                type: 'int'
            }
        });
        
        await BooksService.deleteById(parseInt(id));
        res.status(200).send("Stergere reusita").end();

    } catch (err) {
        next(err);
    }
});

module.exports = router;