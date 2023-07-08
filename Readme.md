# GoKart Backend

Welcome to the GoKart Backend project! This project aims to provide a command-line REPL (Read-Eval-Print Loop) interface to manage the product inventory for GoKart, a quick commerce startup. With this interface, you can add products to the product catalog and manage warehouses to store the products.

## Prerequisites

Make sure you have the following tools installed:

- Node.js
- MongoDB (for database storage)
- Postman (for testing the API)

## Getting Started

1. Clone the repository:
```
git clone <repository-url>
```

2. Install the dependencies:
```
npm install
```

3. Configure the database connection and port number:

- Open the `.env` file and provide your MongoDB connection URL and port number.

4. Start the server:
```
npm start
```
This will start the backend server on `http://localhost:8080`.

## API Routes
This backend project exposes several routes to manage the product inventory. You can test these routes using Postman or any other API testing tool.

## API URLs

The following are the available API URLs for testing the GoKart backend. You can use POSTMAN to send requests to these URLs.

**Add a new product**
- URL: `POST http://localhost:8080/products/addProduct`
Description: Adds a new product to the product catalog.
- Request Body:
Example:
 ```json
{
    "name": "iphone x8",
    "category": "phone" ,
    "subCategory": "apple" ,
    "imageLink": "https://example.com/image.jpg"
}
 ```
- Response: Returns the newly added product details.

**Get products by category, subcategory, or all products**
Example:
- URL: `GET http://localhost:8080/products/getProducts`
- URL: `GET http://localhost:8080/products/getProducts?category=phone`
- URL: `GET http://localhost:8080/products/getProducts?category=phone&subCategory=apple`

**Delete a product by SKU ID**
- URL: `DELETE http://localhost:8080/products/deleteProduct/:sku_id`


**Add a new warehouse**
- URL: `POST http://localhost:8080/warehouses/add`
- Request Body:
Example:
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
`GET http://localhost:8080/warehouses/getAll`

**Get warehouses by state code**
`GET http://localhost:8080/warehouses/getByState/state_code`
- State Code: AP, AR, AS, BR etc.
- more state codes can be added in config\states.js

**Add stock to a warehouse**
`POST http://localhost:8080/warehouses/addStock`
 ```json
{
  "sku_id": "2329",
  "warehouseId": "HR5603",
  "quantity": 10
}
```
- add SKU ID of the product
- add warehouse ID of the target warehouse

**View states with code, number of warehouses, and total stock capacity**
`GET http://localhost:8080/warehouses/view-states`

**Get warehouse information by warehouseId**
`GET http://localhost:8080/warehouses//info/:warehouseId`
- Response: Returns the updated stock details.


**Add a new customer**
`POST http://localhost:8080/customer/addCustomer`
- Request Body:
Example:
```json
{
    "name": "Pankaj",
    "customerId" : "123"
}
```

**Delete customer by ID**
`DELETE http://localhost:8080/customer/:customerId`

**Process an order**
`POST http://localhost:8080/customer/orders/process`
- Request Body:
example:
``` json
 {
  "customerId": "123",
  "sku_id": "3175",
  "orderQty": 5,
  "customerLoc": "fbd"
}
```

**View all orders**
`GET http://localhost:8080/customer/orders`

## Testing with Postman
To test the API routes using Postman:
1. Open Postman.
2. Set the HTTP method (e.g., GET, POST, DELETE) and enter the corresponding URL  for the desired route.
3. If required, add parameters or headers for the request.
4. Click on the "Send" button to send the request to the server.
5. The response will be displayed in the Postman interface, showing the status code and response data.

## Future improvements for the GoKart backend
1. **Authentication and Authorization:** 
Implement user authentication and authorization to secure API endpoints and restrict access based on user roles.
2. **Enhanced Product Catalog:**
Improve product catalog features, such as updating/deleting products and filtering/searching options.
3. **Warehouse Management:**
 Enhance warehouse management capabilities, including updating/deleting warehouses and transferring stock between warehouses.
4. **User Management:**
 Add functionality to manage user profiles, including registration, login, and profile updates.

## Conclusion
Congratulations! You have successfully set up the GoKart Backend project and learned how to manage the product inventory using the command-line REPL interface. You can now add products to the catalog, manage warehouses, process orders, and view inventory information. Happy managing!

If you have any questions or issues, please feel free to reach out for assistance.

## Folder Structure
📦GoKart</br>
 ┣ 📂config</br>
 ┃ ┣ 📜mongoose.js</br>
 ┃ ┗ 📜states.js</br>
 ┣ 📂controllers</br>
 ┃ ┣ 📜customerController.js</br>
 ┃ ┣ 📜productController.js</br>
 ┃ ┗ 📜warehouseController.js</br>
 ┣ 📂models</br>
 ┃ ┣ 📜customer.js</br>
 ┃ ┣ 📜order.js</br>
 ┃ ┣ 📜product.js</br>
 ┃ ┗ 📜warehouse.js</br>
 ┣ 📂routes</br>
 ┃ ┣ 📜customerRoutes.js</br>
 ┃ ┣ 📜productRoutes.js</br>
 ┃ ┗ 📜warehouseRoutes.js</br>
 ┣ 📜.env</br>
 ┣ 📜.gitignore</br>
 ┣ 📜index.js</br>
 ┣ 📜package-lock.json</br>
 ┣ 📜package.json</br>
 ┗ 📜Readme.md</br>
