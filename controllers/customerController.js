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
/******************************************************/
// Delete customer by ID
exports.deleteCustomerById = async (req, res) => {
  try {
    const { customerId } = req.params;
    const deletedCustomer = await Customer.findOneAndDelete({ customerId });
    if (!deletedCustomer) {
      return res.status(404).json({ error: 'Customer not found' });
    }
    res.status(200).json({
      message: 'Customer deleted successfully',
      deletedCustomer,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete customer' });
  }
};
/*************************************************/
