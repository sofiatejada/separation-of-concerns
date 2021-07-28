const Order = require('../models/Order');
const { sendSms } = require('../utils/twilio');

module.exports = class OrderService {
  static async createOrder(value) {
    await sendSms(
      process.env.ORDER_HANDLER_NUMBER,
      `New Order received for ${value.quantity}`
    );

    const order = await Order.insert(value);

    return order;
  }

  static async updatedOrder(id, quantity) {
    await sendSms(
      process.env.ORDER_HANDLER_NUMBER,
      `Order updated to have quantity of ${id.quantity}`
    );

    const order = await Order.updateOrdersById(id, quantity);
    return order;
  }

  static async deletedOrder(id) {
    await sendSms(
      process.env.ORDER_HANDLER_NUMBER,
      `Order ${id.quantity} deleted.`
    );
    const order = await Order.deleteById(id);
    return order;
  }
};
