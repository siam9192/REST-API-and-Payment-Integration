

## Setup Instructions

### Clone the Repository
```bash

git clone https://github.com/siam9192/REST-API-and-Payment-Integration
```

####  Setup Environment Variables

1. Create a `.env` file in the root of the backend directory by copying from `env.example` and update it with your own values:

```bash
cp env.example .env
```



## Databse Seeding

The project includes a seed script to populate the database with **initial demo data** (users, projects, riks).

### Location
/backend/src/app/seed/script.ts


###  Run Seed Script

```bash
npm run seed
```

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
| GET    | `/api/v1/orders`         | Get all orders   (Public endpoint for Testing only)      |
| GET    | `/api/v1/orders/me`         | Get logged in users   orders   |



##  Payment Endpoints

| Method | Endpoint                          | Description                                      |
| ------ | --------------------------------- | ------------------------------------------------ |
| POST   | `/api/v1/payments/webhook`        | Stripe webhook for payment verification         |
| GET    | `/api/v1/payments`                | Get all payments (Public endpoint for Testing only)        |

---






##  How Payment Works

This document describes the end-to-end payment flow using Stripe Checkout and webhooks.

---

##  Payment Flow Overview

1. **Initialize Order**
   - Create an order in the database
   - Set initial statuses:
     - `orderStatus = pending`
     - `paymentStatus = pending`

2. **Create Payment Session**
   - Generate a Stripe Checkout Session
   - Attach required metadata (e.g. `orderId`, `paymentId`)
   - Return the `session_url` to the client

3. **User Makes Payment**
   - User is make payment to the Stripe Checkout page
   - Payment is completed or cancelled on Stripe

4. **Webhook Triggered**
   - Stripe sends an event to the webhook endpoint  
     `POST /api/v1/webhook`
   - Webhook signature is verified using `STRIPE_WEBHOOK_SECRET`

5. **Verify Payment**
   - Validate event type (e.g. `checkout.session.completed`)
   - Read metadata to identify the order/payment

6. **Update Status (Success)**
   - If payment is successful:
     - `payment status = success`
     - `order status = placed`

7. **Update Status (Failure / Cancel)**
   - If payment fails or is cancelled:
     - `payment status = failed`
     - `order status = failed`

8. **Redirection**
   - Redirect user to:
     -  Success page on payment success
     -  Failure / cancel page on payment failure



## Live Link
 https://payment-integration-server.vercel.app