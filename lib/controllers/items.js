const { Router } = require('express');
const authorize = require('../middleware/authorize');
const Item = require('../models/Item');

module.exports = Router()
  .get('/', async (req, res, next) => {
    try {
      const item = await Item.getAll(req.user.id);
      res.json(item);
    } catch (e) {
      next(e);
    }
  })
  .post('/', async (req, res, next) => {
    try {
      const item = await Item.insert({
        description: req.body.description,
        qty: req.body.qty,
        user_id: req.user.id,
      });
      res.json(item);
    } catch (e) {
      next(e);
    }
  })
  .put('/:id', authorize, async (req, res, next) => {
    try {
      const item = await Item.updateById(req.params.id, req.body);
      res.json(item);
    } catch (e) {
      next(e);
    }
  })
  .delete('/:id', authorize, async (req, res, next) => {
    try {
      const item = await Item.delete(req.params.id);
      if (!item) next();
      res.status(200);
      res.send();
    } catch (e) {
      next(e);
    }
  });

