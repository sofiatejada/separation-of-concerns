const { Router } = require('express');
const Order = require('../models/Order');
const OrderService = require('../services/OrderService');

module.exports = Router()
  .post('/', async (req, res, next) => {
    try {
      const order = await OrderService.createOrder(req.body);

      res.send(order);
    } catch(err) {
      next(err);
    }
  })
  .get('/', async (req, res, next) => {
    try {
      const order = await Order.getAllOrders();
      
      res.send(order);
    } catch(err) {
      next(err);
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const order = await Order.getById(id);

      res.send(order);
    } catch(err) {
      next(err);
    }
  })
  .put('/:id', async (req, res, next) => {
    try {
      const id = req.params.id;
      const quantity = req.body.quantity;
      const updated = await OrderService.updatedOrder(id, quantity);
      console.log('UDPATED:');
      console.log(updated);

      res.send(updated);
    } catch(err) {
      next(err);
    }
  })
  .delete('/:id', async (req, res, next) => {
    try {
      const id = req.params.id;
      const deleted = await OrderService.deletedOrder(id);

      res.send({ message: `Order ${deleted.id} has been deleted.` });
    } catch(err) {
      next(err);
    }
  });
