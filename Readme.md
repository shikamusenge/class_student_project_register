## API Documentation

### API Overview

The Customer API allows for managing customer data, including creating, reading, updating, and deleting customers, as well as tracking different versions of customer data. It is designed to be robust, secure, and easy to integrate with other systems.

### Authentication

- **API Key:** Each request must include an API key in the header.
  - **Header:** `Authorization: Bearer YOUR_API_KEY`
- **OAuth:** Support for OAuth 2.0 for secure access.

### Endpoints

#### 1. Retrieve a List of Customers

- **Endpoint:** `/api/v1/customers`
- **Method:** GET
- **Response:** JSON array of customers
- **Status Codes:**
  - `200 OK`: Successfully retrieved the list of customers.
  - `401 Unauthorized`: Authentication failed.

**Sample Request:**

```http
GET /api/v1/customers HTTP/1.1
Host: api.example.com
Authorization: Bearer YOUR_API_KEY
```

**Sample Response:**

```json
[
  {
    "id": "1",
    "name": "John Doe",
    "email": "john.doe@example.com"
  },
  {
    "id": "2",
    "name": "Jane Doe",
    "email": "jane.doe@example.com"
  }
]
```

#### 2. Retrieve a Specific Customer by ID

- **Endpoint:** `/api/v1/customers/{id}`
- **Method:** GET
- **Response:** JSON object of the customer
- **Status Codes:**
  - `200 OK`: Successfully retrieved the customer.
  - `404 Not Found`: Customer not found.
  - `401 Unauthorized`: Authentication failed.

**Sample Request:**

```http
GET /api/v1/customers/1 HTTP/1.1
Host: api.example.com
Authorization: Bearer YOUR_API_KEY
```

**Sample Response:**

```json
{
  "id": "1",
  "name": "John Doe",
  "email": "john.doe@example.com"
}
```

#### 3. Create a New Customer

- **Endpoint:** `/api/v1/customers`
- **Method:** POST
- **Request Body:** JSON object with customer data
- **Response:** JSON object of the created customer
- **Status Codes:**
  - `201 Created`: Successfully created the customer.
  - `400 Bad Request`: Invalid request data.
  - `401 Unauthorized`: Authentication failed.

**Sample Request:**

```http
POST /api/v1/customers HTTP/1.1
Host: api.example.com
Authorization: Bearer YOUR_API_KEY
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john.doe@example.com"
}
```

**Sample Response:**

```json
{
  "id": "1",
  "name": "John Doe",
  "email": "john.doe@example.com"
}
```

#### 4. Update an Existing Customer by ID

- **Endpoint:** `/api/v1/customers/{id}`
- **Method:** PUT
- **Request Body:** JSON object with updated customer data
- **Response:** JSON object of the updated customer
- **Status Codes:**
  - `200 OK`: Successfully updated the customer.
  - `400 Bad Request`: Invalid request data.
  - `404 Not Found`: Customer not found.
  - `401 Unauthorized`: Authentication failed.

**Sample Request:**

```http
PUT /api/v1/customers/1 HTTP/1.1
Host: api.example.com
Authorization: Bearer YOUR_API_KEY
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john.newemail@example.com"
}
```

**Sample Response:**

```json
{
  "id": "1",
  "name": "John Doe",
  "email": "john.newemail@example.com"
}
```

#### 5. Delete a Customer by ID

- **Endpoint:** `/api/v1/customers/{id}`
- **Method:** DELETE
- **Response:** No content
- **Status Codes:**
  - `204 No Content`: Successfully deleted the customer.
  - `404 Not Found`: Customer not found.
  - `401 Unauthorized`: Authentication failed.

**Sample Request:**

```http
DELETE /api/v1/customers/1 HTTP/1.1
Host: api.example.com
Authorization: Bearer YOUR_API_KEY
```

**Sample Response:**

```http
HTTP/1.1 204 No Content
```

### Error Handling

Errors are returned in JSON format with appropriate HTTP status codes.

**Example Error Response:**

```json
{
  "error": "Bad Request",
  "message": "The request could not be understood or was missing required parameters."
}
```

### Rate Limiting

- **Limit:** 100 requests per 15 minutes.
- **Response Header:** `X-Rate-Limit-Remaining` to indicate the remaining number of requests.

### Versioning

API versioning is handled through URL versioning. The version number is included in the URL path to clearly specify the API version being used.

**Example:**

- `/api/v1/customers`

### Additional Information

#### Best Practices

- **Deprecation Notices**: Inform users well in advance when an older version will be deprecated [[2](https://www.postman.com/api-platform/api-versioning/)].
- **Documentation**: Maintain clear, version-specific documentation [[6](https://www.postman.com/api-platform/api-versioning/)].
- **Backward Compatibility**: Ensure new versions are backward compatible to minimize breaking changes [[4](https://www.postman.com/api-platform/api-versioning/)].

#### Tips

- **Consistent Versioning Scheme**: Choose a versioning strategy and stick with it for consistency.
- **Semantic Versioning**: Follow semantic versioning principles to convey the impact of changes (e.g., major, minor, patch).

#### Known Limitations

- **Increased Maintenance**: Managing multiple versions can increase maintenance overhead.
- **User Confusion**: Multiple versions might confuse users; clear documentation is crucial to mitigate this [[1](https://kodekloud.com/blog/api-versioning-best-practices/)].

## Running Rules

### Step 1: Install Dependencies

1. Navigate to the server directory and install dependencies:
   ```bash
   cd server
   npm install
   ```
2. Navigate to the client directory and install dependencies:
   ```bash
   cd ../client
   npm install
   ```

### Step 2: Run Server

1. Navigate back to the server directory:
   ```bash
   cd ../server
   ```
2. Start the server:
   ```bash
   npm run start
   ```

### Step 3: Create Database

1. Create a database called `todo`.
2. Create a table `customers` in the `todo` database with the following structure:
   ```sql
   CREATE TABLE customers (
       customer_id INT AUTO_INCREMENT PRIMARY KEY,
       names VARCHAR(255),
       email VARCHAR(255),
       phone VARCHAR(20)
   );
   ```

### Step 4: Change Key

1. After starting the server, a key will be generated.
2. Modify the generated key in the `/client/js/baseUrl.js` file:
   - Open `/client/js/baseUrl.js`.
   - Replace the placeholder or old key with the new generated key.

### Step 5: Run Client

1. Open the `index.html` file located in the `/client` directory:
   - Navigate to the `/client` directory.
   - Open `index.html` in your preferred web browser.

## 🗒️ Answer

1. Install dependencies in both the server and client directories.
2. Navigate to the server directory and start the server.
3. Create a `todo` database and a `customers` table within it.
4. After the server is running, update the generated key in `/client/js/baseUrl.js`.
5. Open `index.html` in the `/client` directory to run the client application.
