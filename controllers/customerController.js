const Customer = require('../models/customer');

// Add a new customer
exports.addCustomer = async (req, res) => {
  try {
    const { customerId, name } = req.body;
    const customer = new Customer({
      customerId,
      name,
    });
    await customer.save();
    res.status(201).json(customer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to add the customer' });
  }
};
