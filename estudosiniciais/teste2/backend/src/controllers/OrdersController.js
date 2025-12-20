let orders = [];
let id = 1;

export default class OrdersController {
  create(req, res) {
    const order = {
      id: id++,
      items: req.body.items
    };

    orders.push(order);
    return res.status(201).json(order);
  }

  index(req, res) {
    return res.json(orders);
  }
}
