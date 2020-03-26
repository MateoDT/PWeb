const express = require('express');

const PublishersService = require('./services.js');
const { validateFields } = require('../utils');
const { ServerError } = require('../errors');

const router = express.Router();

//GET /publishers -> numele editurilor
router.get('/', async (req, res, next) => {
    
    try {

    	const publishers = await PublishersService.getAll();
    	res.json(publishers);
    
    } catch (err) {
    	next(err);
    }
  });

//GET /publishers/:id -> numele editurii cu id-ul dat
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

		const publisher = await PublishersService.getById(parseInt(id));
		res.json(publisher);
    
    } catch (err) {
    	next(err);
    }
  });

//POST /publishers -> inserare editura cu numele dat
router.post('/', async (req, res, next) => {
    const { 
    	name 
    } = req.body;
  
    try {
		
		const fieldsToBeValidated = {
			name: {
				value: name,
				type: 'alpha'
			}
		};

		validateFields(fieldsToBeValidated);

		await PublishersService.add(name);
		res.status(201).send("S-a produs inserarea");
    
    } catch (err) {
		next(err);
    }
  });

//PUT /publishers/:id -> actualizare campuri editura cu id-ul dat (name)
router.put('/:id', async (req, res, next) => {
    const {
    	id 
    } = req.params;
    const { 
    	name 
    } = req.body;
  
    try {
    	const fieldsToBeValidated = {
    		id: {
    			value: id,
    			type: 'int'
    		},
    		name: {
    			value: name,
    			type: 'alpha'
    		}
    	};

    	validateFields(fieldsToBeValidated);

    	await PublishersService.updateById(parseInt(id), name);
    	res.status(200).send("Actualizare reusita");
    
    } catch (err) {
    	next(err);
    }
  });

//DELETE /publishers/:id -> sterge editura cu id-ul dat
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
      	
      	await PublishersService.deleteById(parseInt(id));
      	res.status(200).send("Stergere reusita");
    
    } catch (err) {
		next(err);
    }
  });

module.exports = router;