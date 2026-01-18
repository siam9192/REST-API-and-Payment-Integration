
#  Postman Documentation

##  Postman Setup Instructions
Import shared collection file
Create a Postman **environment variable**:

| Variable | Value |
|---------|-------|
| base | https://payment-integration-server.vercel.app/api/v1 |

Use it in all requests like:
{{base}}/auth/login


---

##  JWT Authorization Setup

No manual JWT setup is required.

- After successful login, the **access token is automatically stored in Postman cookie store**
- The token is sent automatically with every subsequent request
- All protected endpoints work without manually setting headers

---

##  API Endpoints



##  Authentication Endpoints

| Method | Endpoint                   | Description                                              |
| ------ | -------------------------- | -------------------------------------------------------- |
| POST   | `/api/v1/auth/login`       | Authenticate user and return access & refresh tokens     |
| POST   | `/api/v1/auth/register`    | Register a new user                                      |




##  User Endpoints

| Method | Endpoint               | Description                                  |
| ------ | ---------------------- | -------------------------------------------- |
| GET    | `/api/v1/users/me`     | Get currently logged-in user profile         |
| GET    | `/api/v1/users`        | Get all users      (Public route for Testing only)        |



##  Product Endpoints

| Method | Endpoint                    | Description                       |
| ------ | --------------------------- | --------------------------------- |
| POST   | `/api/v1/products`          | Create a new product              |
| GET    | `/api/v1/products`          | Get all products                  |




##  Order Endpoints

| Method | Endpoint                 | Description                         |
| ------ | ------------------------ | ----------------------------------- |
| POST   | `/api/v1/orders/init`         | Init a new order                  |
| GET    | `/api/v1/orders`         | Get all orders   (Public route for Testing only)      |
| GET    | `/api/v1/orders/me`         | Get logged in users   orders   |



##  Payment Endpoints

| Method | Endpoint                          | Description                                      |
| ------ | --------------------------------- | ------------------------------------------------ |
| POST   | `/api/v1/payments/webhook`        | Stripe webhook for payment verification         |
| GET    | `/api/v1/payments`                | Get all payments (Public route for Testing only)        |

---


##  Pagination Instructions

Some endpoints support **pagination, sorting, and ordering**.  
You can control which page, how many items per page, and the sort order using **query parameters**.

---

###  Query Parameters for pagination and sorting 

| Parameter   | Type    | Description                                        | Example        |
|------------|---------|----------------------------------------------------|----------------|
| page       | Number  | The page number to fetch (default = 1)            | `page=1`       |
| limit      | Number  | Number of items per page (default = 10)           | `limit=4`      |
| sortBy     | String  | Field to sort by                                   | `sortBy=createdAt` |
| sortOrder  | String  | Sort direction: `asc` for ascending, `desc` for descending | `sortOrder=desc` |

---

### Example Usage

**Endpoint:**  

```
GET /products?page=1&limit=4&sortBy=createdAt&sortOrder=desc
```



## Authentication Endpoints

- ### **Registration**
```
POST /api/v1/auth/register
```
**Request Body Example:**
```
{
    "fullName":"Rony Ahmend",
    "gender":"male",
    "email":"rony@gmail.com",
    "password":"demo123"
}
```
**Response Example:**
```
{
    "success": true,
    "statusCode": 200,
    "message": "Registration successful",
    "data":null
}
```


## User Endpoints

- ### **Get all users**
```
POST /api/v1/users
```
**Request Body Example:**
```
{
    "success": true,
    "statusCode": 200,
    "message": "Users retrieved successfully",
    "data": [
        {
            "_id": "696a556c3a1f955c9ff1f79c",
            "fullName": "Rony Ahmed",
            "gender": "male",
            "email": "userdemo1@gmail.com",
            "createdAt": "2026-01-16T15:12:44.600Z",
            "updatedAt": "2026-01-16T15:12:44.600Z",
            "__v": 0
        },
        {
            "_id": "696a556c3a1f955c9ff1f79e",
            "fullName": "Siam Hasan",
            "gender": "male",
            "email": "userdemo2@gmail.com",
            "createdAt": "2026-01-16T15:12:44.650Z",
            "updatedAt": "2026-01-16T15:12:44.650Z",
            "__v": 0
        },
       
    ],
    "meta": {
        "page": 1,
        "limit": 10,
        "total": 2
    }
}

```

- ### **Get logged in user**
```
GET /api/v1/users/me
```
**Request Body Example:**
```
{
    "success": true,
    "statusCode": 200,
    "message": "Current user retrieved successfully",
    "data": {
        "_id": "696a556c3a1f955c9ff1f79c",
        "fullName": "Rony Ahmed",
        "gender": "male",
        "email": "userdemo1@gmail.com",
        "createdAt": "2026-01-16T15:12:44.600Z",
        "updatedAt": "2026-01-16T15:12:44.600Z",
        "__v": 0
    }
}
```
**Response Example:**
```
{
    "success": true,
    "statusCode": 200,
    "message": "Login successful and accessToken retrieved with cookie",
    "data":null
}
```





## Product Endpoints

- ### **Create Product**
```
POST /api/v1/products
```
**Request Body Example:**
```
{
    "name": "Laptop Stand",
    "description": "Adjustable aluminum laptop stand for better posture and heat dissipation.",
    "imageUrl": "https://uniquepeacebd.com/public/uploads/all/X3YJMm4q4UFR8IEvDSR9BJY3N4BCF34YQtSiZscQ.jpg",
    "price": 29.99
}
```
**Response Example:**
```
{
    "success": true,
    "statusCode": 201,
    "message": "Product created successfully",
    "data": {
        "name": "Laptop Stand",
        "description": "Adjustable aluminum laptop stand for better posture and heat dissipation.",
        "imageUrl": "https://uniquepeacebd.com/public/uploads/all/X3YJMm4q4UFR8IEvDSR9BJY3N4BCF34YQtSiZscQ.jpg",
        "price": 29.99,
        "_id": "696d1658fafacd9f23ec76ef",
        "createdAt": "2026-01-18T17:20:24.965Z",
        "updatedAt": "2026-01-18T17:20:24.965Z",
        "__v": 0
    }
}
```


- ### **Get All Products**
```
GET /api/v1/products
```
**Request Body Example:**
```
{
    "email":"rony@gmail.com",
    "password":"demo123"
}
```
**Response Example:**
```
{
    "success": true,
    "statusCode": 200,
    "message": "Products retrieved successfully",
    "data": [
        {
            "_id": "696d1658fafacd9f23ec76ef",
            "name": "Laptop Stand",
            "description": "Adjustable aluminum laptop stand for better posture and heat dissipation.",
            "imageUrl": "https://uniquepeacebd.com/public/uploads/all/X3YJMm4q4UFR8IEvDSR9BJY3N4BCF34YQtSiZscQ.jpg",
            "price": 29.99,
            "createdAt": "2026-01-18T17:20:24.965Z",
            "updatedAt": "2026-01-18T17:20:24.965Z",
            "__v": 0
        },
        {
            "_id": "696a7e13aea4056d925b1be9",
            "name": "Laptop Stand",
            "description": "Adjustable aluminum laptop stand for better posture and heat dissipation.",
            "imageUrl": "https://uniquepeacebd.com/public/uploads/all/X3YJMm4q4UFR8IEvDSR9BJY3N4BCF34YQtSiZscQ.jpg",
            "price": 29.99,
            "createdAt": "2026-01-16T18:06:11.473Z",
            "updatedAt": "2026-01-16T18:06:11.473Z",
            "__v": 0
        }
    ],
    "meta": {
        "page": 1,
        "limit": 10,
        "total": 2
    }
}
```



## Order Endpoints

- ### **Order Initialize**
```
POST /api/v1/orders/init
```
**Request Body Example:**
```
{
   "productId":"696a556c3a1f955c9ff1f76d",
    "quantity":5,
    "deliveryAddress":"Mymensing Sadar,Mymenshing,Bangladesh"
}
```
**Response Example:**
```
{
    "success": true,
    "statusCode": 201,
    "message": "Order initialized successfully",
    "data": {
        "paymentSessionUrl": "https://checkout.stripe.com/c/pay/cs_test_a1IcsK7G36gXgFSrCEWYb1BJL0MK4itmdkZvdijD9VgsS5cGx54GINUpu2#fidnandhYHdWcXxpYCc%2FJ2FgY2RwaXEnKSdkdWxOYHwnPyd1blpxYHZxWjA0SkBDamRDNXBrNjFHdlB%2FaUZgRDRUb3M0M28xRGdgUnVhNkRQdlNiU31nMU9BNEFnXzAyQm9mRlxrPXZLZ2BqbE1dPXZzbTJsUX90SFFmN2hofGhnYV13NTVmZzxRS2N9dycpJ2N3amhWYHdzYHcnP3F3cGApJ2dkZm5id2pwa2FGamlqdyc%2FJyZjY2NjY2MnKSdpZHxqcHFRfHVgJz8ndmxrYmlgWmxxYGgnKSdga2RnaWBVaWRmYG1qaWFgd3YnP3F3cGB4JSUl"
    }
}
```


- ### **Get logged in user orders**
```
POST /api/v1/orders/me
```
**Response Example:**
```
{
    "success": true,
    "statusCode": 200,
    "message": "Orders retrieved successfully",
    "data": [
        {
            "_id": "696d176ded10575d69d8a8db",
            "productInfo": {
                "id": "696a556c3a1f955c9ff1f76d",
                "name": "Smart Watch",
                "price": 99.99,
                "quantity": 5,
                "_id": "696d176ded10575d69d8a8dc"
            },
            "subtotal": 499.95,
            "deliveryAddress": "Mymensing Sadar,Mymenshing,Bangladesh",
            "status": "placed",
            "userId": "696a556c3a1f955c9ff1f79c",
            "createdAt": "2026-01-18T17:25:01.955Z",
            "updatedAt": "2026-01-18T17:25:01.955Z",
            "__v": 0
        },
        {
            "_id": "696c8cac4b5b04c22d738482",
            "productInfo": {
                "id": "696a556c3a1f955c9ff1f76b",
                "name": "Mechanical Keyboard",
                "price": 79.99,
                "quantity": 5,
                "_id": "696c8cac4b5b04c22d738483"
            },
            "subtotal": 399.95,
            "deliveryAddress": "Mymensing Sadar,Mymenshing,Bangladesh",
            "status": "placed",
            "userId": "696a556c3a1f955c9ff1f79c",
            "createdAt": "2026-01-18T07:33:00.366Z",
            "updatedAt": "2026-01-18T07:33:00.366Z",
            "__v": 0
        }
    ],
    "meta": {
        "page": 1,
        "limit": 10,
        "total": 2
    }
}
```



- ### **Get all orders**
```
POST /api/v1/orders
```
**Response Example:**
```
{
    "success": true,
    "statusCode": 200,
    "message": "Orders retrieved successfully",
    "data": [
        {
            "_id": "696d176ded10575d69d8a8db",
            "productInfo": {
                "id": "696a556c3a1f955c9ff1f76d",
                "name": "Smart Watch",
                "price": 99.99,
                "quantity": 5,
                "_id": "696d176ded10575d69d8a8dc"
            },
            "subtotal": 499.95,
            "deliveryAddress": "Mymensing Sadar,Mymenshing,Bangladesh",
            "status": "placed",
            "userId": "696a556c3a1f955c9ff1f79c",
            "createdAt": "2026-01-18T17:25:01.955Z",
            "updatedAt": "2026-01-18T17:25:01.955Z",
            "__v": 0
        },
        {
            "_id": "696c8cac4b5b04c22d738482",
            "productInfo": {
                "id": "696a556c3a1f955c9ff1f76b",
                "name": "Mechanical Keyboard",
                "price": 79.99,
                "quantity": 5,
                "_id": "696c8cac4b5b04c22d738483"
            },
            "subtotal": 399.95,
            "deliveryAddress": "Mymensing Sadar,Mymenshing,Bangladesh",
            "status": "placed",
            "userId": "696a556c3a1f955c9ff1f79c",
            "createdAt": "2026-01-18T07:33:00.366Z",
            "updatedAt": "2026-01-18T07:33:00.366Z",
            "__v": 0
        }
    ],
    "meta": {
        "page": 1,
        "limit": 10,
        "total": 2
    }
}
```






## Payments Endpoints

- ### **Get all payments**
```
POST /api/v1/payments
```
**Response Example:**
```
{
    "success": true,
    "statusCode": 200,
    "message": "Payments retrieved successfully",
    "data": [
        {
            "_id": "696a58f9f9b4be3aaf116f35",
            "transactionId": "1768577272923",
            "amount": 399.95,
            "status": "pending",
            "orderId": "696a58f8f9b4be3aaf116f32",
            "userId": "696a556c3a1f955c9ff1f79c",
            "createdAt": "2026-01-16T15:27:53.239Z",
            "updatedAt": "2026-01-16T15:27:53.239Z",
            "__v": 0
        },
        {
            "_id": "696a594681c1716824ace09a",
            "transactionId": "1768577350032",
            "amount": 399.95,
            "status": "pending",
            "orderId": "696a594681c1716824ace097",
            "userId": "696a556c3a1f955c9ff1f79c",
            "createdAt": "2026-01-16T15:29:10.332Z",
            "updatedAt": "2026-01-16T15:29:10.332Z",
            "__v": 0
        }
    ],
    "meta": {
        "page": 1,
        "limit": 2,
        "total": 2
    }
}
```


