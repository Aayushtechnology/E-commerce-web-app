# E-commerce Web App API Documentation

## Base URLs
- Local: `http://localhost:3000/api`
- Live: `https://e-commerce-web-app-1-pwrq.onrender.com/api`

> Note: The app currently mounts these routes in `app.js`:
> - `/api/auth/` → `authRoute`
> - `/api/product` → `productRoute`
> - `/api/auth/product/` → `productRoute` (duplicate mount of same product route)
> - `/api/admin/` → `adimuserRoute`
> - `/api/order` → `oderRoute`
> - `/api/admin/order` → `adimuserRoute` (duplicate mount of same admin user route)
> - `/api/cart` → `CartRoute`

## Authentication

### POST `/api/auth/register`
Register a new user.
- Body (JSON):
  - `username` (string, required)
  - `email` (string, required)
  - `userNumber` (string, required)
  - `password` (string, required)
- Response:
  - `message`: registration status
  - `data`: created user object

### POST `/api/auth/login`
Login and receive a JWT token.
- Body (JSON):
  - `email` (string, required)
  - `password` (string, required)
- Response:
  - `message`: login status
  - `data`: user object array
  - `token`: JWT token

### POST `/api/auth/forgotpassword`
Request an OTP for password reset.
- Body (JSON):
  - `email` (string, required)
- Response:
  - `message`: OTP send status

### POST `/api/auth/verifyotp`
Verify the OTP sent to a registered email.
- Body (JSON):
  - `email` (string, required)
  - `otp` (number or string, required)
- Response:
  - `message`: verification status

### POST `/api/auth/resetpassword`
Reset password after OTP verification.
- Body (JSON):
  - `email` (string, required)
  - `newPassword` (string, required)
  - `confirmPassword` (string, required)
- Response:
  - `message`: reset status

## Products

### POST `/api/product/createProduct`
Create a new product.
- Headers:
  - `Authorization`: JWT token
- Middleware:
  - `isAuthention` (auth required)
  - `restrictTo` (admin role intended, but current middleware only logs roles)
- Body: `multipart/form-data`
  - `productName` (string, required)
  - `productDescription` (string, required)
  - `productPrice` (number, required)
  - `productStatus` (string, required, `active` or `inactive`)
  - `productStockQty` (number, required)
  - `productImage` (file, optional)
- Response:
  - `message`: product creation status
  - `data`: created product object

### GET `/api/product/getProducts`
Get all products.
- Response:
  - `message`: fetch status
  - `data`: array of product objects

### GET `/api/product/getProducts/:id`
Get a single product by ID.
- URL Parameters:
  - `id` (product MongoDB `_id`)
- Response:
  - `message`: fetch status
  - `data`: product array containing the single product

> Note: `/api/auth/product/getProducts` is also mounted to the same product route because of duplicate route registration in `app.js`.

## Orders

### GET `/api/order/`
Get orders for the authenticated user.
- Headers:
  - `Authorization`: JWT token
- Response:
  - `message`: order fetch status
  - `data`: orders array

### POST `/api/order/`
Create a new order for the authenticated user.
- Headers:
  - `Authorization`: JWT token
- Body (JSON):
  - `shippingAddress` (string, required)
  - `items` (array, required)
  - `totalAmount` (number, required)
  - `paymentDetails` (object, required)
  - `phoneNumber` (number, required)
  - `orderStatus` (string, optional, defaults to `pending`)
- Response:
  - `message`: order creation status
  - `data`: created order object

### PATCH `/api/order/cancel`
Cancel a pending order.
- Headers:
  - `Authorization`: JWT token
- Body (JSON):
  - `id` (order ID, required)
- Response:
  - `message`: cancel status
  - `data`: updated order object

### PATCH `/api/order/:id`
Update an order by ID.
- Headers:
  - `Authorization`: JWT token
- URL Parameters:
  - `id` (order ID)
- Body (JSON):
  - `shippingAddress` (string, required)
  - `items` (array, required)
- Response:
  - `message`: update status
  - `data`: updated order object

### DELETE `/api/order/:id`
Delete a pending order by ID.
- Headers:
  - `Authorization`: JWT token
- URL Parameters:
  - `id` (order ID)
- Response:
  - `message`: deletion status
  - `data`: null

## Cart

### POST `/api/cart/:productId`
Add a product to the authenticated user’s cart.
- Headers:
  - `Authorization`: JWT token
- URL Parameters:
  - `productId` (product ID)
- Response:
  - `message`: add status
  - `data`: updated cart array

## Admin

### GET `/api/admin/user`
Fetch users (intended for admin use).
- Headers:
  - `Authorization`: JWT token
- Middleware:
  - `isAuthention` (auth required)
  - `restrictTo("admin")` (intended admin-only access, but current implementation only logs role)
- Response:
  - `data`: user list

> Note: Because `app.js` also mounts `adimuserRoute` at `/api/admin/order`, the same endpoint is also available at `/api/admin/order/user`.

## Important Notes

- `Authorization` header is required for protected routes.
- Tokens are generated using JWT with secret `hello@33rwcfd,.dhh`.
- `userprofileRoute.js` is present in the project but not mounted in `app.js`, so its routes are currently inactive.
- `PaymentRoute.js` is present but also not mounted in `app.js`, so payment endpoints are currently inactive.
- The `restrictTo` middleware is currently incomplete: it logs role values but does not block unauthorized roles.

## Models and Payloads

### User model fields
- `userName`
- `userEmail`
- `userNumber`
- `userPassword`
- `role` (`customer` or `admin`)
- `cart` array of items: `{ product, quantity }`

### Product model fields
- `productName`
- `productDescription`
- `productStockQty`
- `productPrice`
- `productStatus` (`active` or `inactive`)
- `productImage`

### Order model fields
- `user`
- `items` array: `{ product, quantity }`
- `totalAmount`
- `shippingAddress`
- `phoneNumber`
- `orderStatus`
- `paymentDetails`: `{ pidx, method, status }`
