const express = require('express');
const router = express.Router();
const bookDb = require('./database.js');

const book = {
	title: String,
	author: String
}
  
router.use(express.json());

router.get('/', (req, res) => {
	try	{
		const autor = req.query.author;
		
		if (!autor) {
			res.status(200).send(bookDb.getAllFromDb());
		} else {
			res.status(200).send(bookDb.getFromDbByAuthor(autor));	 	
		}
	} catch (error) {
		res.status(400).send("Nu s-a putut aduce continutul");
	}
});

router.get('/:id', (req, res) => {
	try	{
		const id = req.params.id;
		const book = bookDb.getFromDbById(id);

		res.status(200).send(book);

	} catch (error) {
		res.status(400).send("Nu s-a putut aduce continutul");
	}
});
	 
router.post('/', (req, res) => {
	try	{
		book.title = req.body.title;
		book.author = req.body.author;

		bookDb.insertIntoDb(book);
		res.status(201).send("S-a produs inserarea");
	
	} catch (error) {
		res.status(400).send("Eroare la inserare");
	}
});
  
router.put('/:id', (req, res) => {
	try	{
		const id = req.params.id;

		bookDb.updateById(id, req.body);
		res.status(200).send("S-a produs actualizarea");

	} catch (error) {
		res.status(400).send("Eroare la actualizare");
	}
});

router.delete('/', (req, res) => {
	try	{
		const autor = req.query.author;
		
		if (!autor) {
			bookDb.purgeDb();
			res.status(200).send("Stergere a intregii baze de date efectuata");
		} else {
			bookDb.removeFromDbByAuthor(autor);
			res.status(200).send("Stergere dupa autor efectuata");
		}
	} catch (error) {
		res.status(400).send("Eroare la stergere");
	}
});
  
router.delete('/:id', (req, res) => {
	try	{
		const id = req.params.id;
		
		bookDb.removeFromDbById(id);
		res.status(200).send("Stergere dupa id efectuata");
	} catch (error) {
		res.status(400).send("Eroare la stergere");
	}
});

module.exports = router;