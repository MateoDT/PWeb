const express = require('express');

const BooksService = require('./services.js');
const {
    validateFields
} = require('../utils');
const {
    authorizeAndExtractToken
} = require('../security/Jwt');
const {
    ServerError
} = require('../errors');
const {
    authorizeRoles
} = require('../security/Roles');

const router = express.Router();

router.post('/', authorizeAndExtractToken, authorizeRoles('admin'), async (req, res, next) => {
    const {
        name,
        authorId,
        genres
    } = req.body;
    try {
        // do logic
        //validate name and author id
        const fieldsToBeValidated = {
            name: {
                value: name,
                type: 'ascii'
            },
            author: {
                value: authorId,
                type: 'ascii'
            }
        }
        validateFields(fieldsToBeValidated);

        for (i = 0; i < genres.length; i++) {
            validateFields({
                genre: {
                    value: genres[i],
                    type: 'alpha'
                }
            });
        }

        await BooksService.add(name, authorId, genres);
        res.status(201).end();
    } catch (err) {
        // daca primesc eroare, pasez eroarea mai departe la handler-ul de errori declarat ca middleware in start.js 
        // pot sa primesc eroare si ca genul nu e bun, trebuie verificat mesajul erorii
        // HINT err.message
        if (err.message.includes("is not a valid enum value"))
            next(new ServerError(err.message, 400));
        else
            next(err);
    }
});

router.get('/', authorizeAndExtractToken, authorizeRoles('admin', 'user'), async (req, res, next) => {
    try {
        // do logic
        const books = await BooksService.getAll();
        res.status(200).json(books);
    } catch (err) {
        // daca primesc eroare, pasez eroarea mai departe la handler-ul de errori declarat ca middleware in start.js 
        next(err);
    }
});

router.get('/:id', authorizeAndExtractToken, authorizeRoles('admin', 'user'), async (req, res, next) => {
    const {
        id
    } = req.params;
    try {
        // do logic
        validateFields({
            id: {
                value: id,
                type: 'ascii'
            }
        });

        const book = await BooksService.getById(id);
        res.status(200).json(book);
    } catch (err) {
        // daca primesc eroare, pasez eroarea mai departe la handler-ul de errori declarat ca middleware in start.js 
        next(err);
    }
});

router.get('/authors/:id', authorizeAndExtractToken, authorizeRoles('admin', 'user'), async (req, res, next) => {
    const {
        id
    } = req.params;
    try {
        // do logic
        validateFields({
            id: {
                value: id,
                type: 'ascii'
            }
        });

        const book = await BooksService.getByAuthorId(id);
        res.status(200).json(book);
    } catch (err) {
        // daca primesc eroare, pasez eroarea mai departe la handler-ul de errori declarat ca middleware in start.js 
        next(err);
    }
});

router.put('/:id', authorizeAndExtractToken, authorizeRoles('admin'), async (req, res, next) => {
    const {
        id
    } = req.params;
    const {
        name,
        authorId,
        genres
    } = req.body;
    try {
        // do logic
        //validate book id
        validateFields({
            id: {
                value: id,
                type: 'ascii'
            }
        });

        //validate name and author id
        const fieldsToBeValidated = {
            name: {
                value: name,
                type: 'ascii'
            },
            author: {
                value: authorId,
                type: 'ascii'
            }
        }
        validateFields(fieldsToBeValidated);

        for (i = 0; i < genres.length; i++) {
            validateFields({
                genre: {
                    value: genres[i],
                    type: 'alpha'
                }
            });
        }

        await BooksService.updateById(id, name, authorId, genres);
        res.status(201).end();
    } catch (err) {
        // daca primesc eroare, pasez eroarea mai departe la handler-ul de errori declarat ca middleware in start.js 
        // pot sa primesc eroare si ca genul nu e bun, trebuie verificat mesajul erorii
        // HINT err.message 
        if (err.message.includes("is not a valid enum value"))
            next(new ServerError(err.message, 400));
        else
            next(err);
    }
});

router.delete('/:id', authorizeAndExtractToken, authorizeRoles('admin'), async (req, res, next) => {
    const {
        id
    } = req.params;
    try {
        // do logic
        validateFields({
            id: {
                value: id,
                type: 'ascii'
            }
        });

        await BooksService.deleteById(id);
        res.status(200).end();
    } catch (err) {
        // daca primesc eroare, pasez eroarea mai departe la handler-ul de errori declarat ca middleware in start.js 
        next(err);
    }
});

module.exports = router;