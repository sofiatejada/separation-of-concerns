const pool = require("../utils/pool")

// static method: Order.insert, Number.parseInt, Math.random
// instance method: .map, .toString(), .toUpperCase()

module.exports = class Order {
  id;
  quantity;

  constructor(row) {
    this.id = row.id;
    this.quantity = row.quantity;
  }

  static async insert(value) {
    const { rows } = await pool.query(
      'INSERT INTO orders (quantity) VALUES ($1) RETURNING *',
      [value.quantity]
    )
    console.log(rows);
    return new Order(rows[0]);
  }

  static async getById(id) {
    const { rows } = await pool.query(
      'SELECT * from orders WHERE id=$1',
      [id]
    )
    return new Order(rows[0]);
  }

  static async getAllOrders() {
    const { rows } = await pool.query(
      'SELECT * from orders'
    )
    return rows.map((row) => new Order(row));
  }

  static async updateOrdersById(id) {
    const existingOrder = await Order.getById(id);

    const newQuantity = quantity ?? existingOrder.quantity;

    const { rows } = await pool.query('UPDATE orders SET quantity=$1 WHERE id=$2 RETURNING *', [newQuantity, id]);

    return new Order.getById(rows[0]);
  }

  static async deleteById(id) {
    const { rows } = await pool.query('DELETE from orders WHERE id=$1 RETURNING *', [id]);

    return new Order(rows[0]);
  }
};
