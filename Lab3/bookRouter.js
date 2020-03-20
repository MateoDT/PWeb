const express = require('express');
const router = express.Router();
const db = require('./database.js');


router.use(express.json());
router.post('/', (req, res) => {

	try {
		const bookTitl = req.query.title;
		const bookAuth = req.query.author;

		const book = {
			title: bookTitl,
			author: bookAuth
		}

		db.insertIntoDb(book);
		res.status(200).json(book);
	} catch(error) {
		res.status(404).send("Nu s-a putut face inserarea");
	}
	
});

router.get('/:id', (req, res) => {
	try {
		const paramId = req.params.id;
		const response = db.getFromDbById(paramId)
		res.status(200).send(response);
	} catch(error) {
		res.status(404).send(response);
	}
	
});

router.get('/', (req, res) => {
	try {
		const paramAuth = req.query.author;
		if(paramAuth) {
			res.send(db.getFromDbByAuthor(paramAuth));
		}
		else {
			res.send(db.getAllFromDb());
		}
		
	} catch(error) {
		res.status(404).send("Eroare la aducerea continutului");
	}
	
});

router.put('/:id', (req, res) => {
	try {
		const paramId = req.params.id;
		if(paramId) {
			res.send(db.updateById(paramAuth));
		}
		else {
			res.send(db.getAllFromDb());
		}
		
	} catch(error) {
		res.status(404).send("Eroare la actualizarea continutului");
	}
	
});





 
module.exports = router;
