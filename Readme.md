# GoKart Backend

This repository contains the backend code for GoKart, a quick commerce start-up. The backend provides functionality to manage the product inventory, including adding products to the catalog, managing warehouses, and processing orders. This README will guide you on how to test the backend API using POSTMAN.

## Prerequisites

- Node.js and npm installed on your machine
- MongoDB database connection

## Getting Started

1. Clone the repository:
```
git clone <repository-url>
```

2. Install the dependencies:
```
npm install
```


3. Configure the database connection:

- Open the `.env` file and provide your MongoDB connection URL and port.

4. Start the server:

This will start the backend server on `http://localhost:8080`.

## API Endpoints

The following are the available API endpoints for testing the GoKart backend. You can use POSTMAN to send requests to these endpoints.

- **Add a new product**

- Endpoint: `POST http://localhost:8080/products/addProduct`
- Request Body:
 ```json
{
    "name": "iphone x8",
    "category": "phone" ,
    "subCategory": "apple" ,
    "imageLink": "https://example.com/image.jpg"
}
 ```
- Response: Returns the newly added product details.

- **Get products by category, subcategory, or all products**

- Endpoint: `POST http://localhost:8080/products/getProducts`
- Endpoint: `POST http://localhost:8080/products/getProducts?category=phone`
- Endpoint: `POST http://localhost:8080/products/getProducts?category=phone&subCategory=apple`

**Delete a product by SKU ID**

- Endpoint: `DELETE http://localhost:8080/products/deleteProduct/:sku_id`

- **Add a new warehouse**

- Endpoint: `POST http://localhost:8080/warehouses/add`
- Request Body:
 ```json
 {
  "name": "abc",
  "state": "Haryana",
  "location": "fbd",
  "stockLimit": 1000
}
 ```
- Response: Returns the newly added warehouse details.

**Get all warehouses**
`http://localhost:8080/warehouses/getAll`

**Get warehouses by state code**
`http://localhost:8080/warehouses/getByState/state_code`

**Add stock to a warehouse**
`http://localhost:8080/warehouses/addStock`
 ```json
{
  "sku_id": "",
  "warehouseId": "your_warehouseId_here",
  "quantity": 10
}
```
- add SKU ID of the product
- add warehouse ID of the target warehouse

**View states with code, number of warehouses, and total stock capacity**
`http://localhost:8080/warehouses/view-states`

**Get warehouse information by warehouseId**

`http://localhost:8080/warehouses//info/HR1975`

- Response: Returns the updated stock details.

**Add a new customer**
` http://localhost:8080/customer/addCustomer`
  ```json
{
    "name": "Pankaj",
    "customerId" : "123"
}
```
**Process an order**
` http://localhost:8080/customer/orders/process`
``` json
 {
  "customerId": "123",
  "sku_id": "3175",
  "orderQty": 5,
  "customerLoc": "fbd"
}```

** View all orders**
` http://localhost:8080/customer/orders`




## Conclusion

You can use POSTMAN to send requests to the GoKart backend API and test the different endpoints for managing the product inventory. Refer to the API documentation above for the request formats and response structures.

If you encounter any issues or have any questions, feel free to open an issue in this repository.

- Many more features can be added in it like Authentication and Authorization feature etc.
