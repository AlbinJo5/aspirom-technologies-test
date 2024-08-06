## Microservices Test

**# Table of Contents**

- [Overview](#overview)
- [Prerequisites](#prerequisites)
  - [Node.js](#nodejs)
  - [MongoDB](#mongodb)
- [Setup Instructions](#setup-instructions)
  - [Clone the Repository](#clone-the-repository)
  - [Environment Variables](#environment-variables)
  - [Install Dependencies](#install-dependencies)
  - [Run Services (Development)](#run-services-development)
  - [Build and Start Services (Production)](#build-and-start-services-production)
- [Running Tests](#running-tests)
- [OpenAPI Documentation](#openapi-documentation)
- [Contributing](#contributing) (Optional)
- [License](#license)

**# Overview**

This project is a simple microservices-based system built with Node.js, consisting of two independent services: User Service and Product Service. Each service has its own database and communicates with each other via HTTP requests. The API endpoints are documented using OpenAPI (Swagger).

**# Prerequisites**

### Node.js (<-- [Link to official website](https://nodejs.org/))

Ensure you have Node.js installed on your system. You can download it from the official Node.js website.

### MongoDB (<-- [Link to official website](https://www.mongodb.com/))

This project utilizes MongoDB as the database. You can install MongoDB locally or use a cloud-based MongoDB service.

**# Setup Instructions**

**1. Clone the Repository**

```bash
git clone https://github.com/AlbinJo5/aspirom-technologies-test.git
cd aspirom-technologies-test
```

**2. Environment Variables**

Each service has its own `.env` and `.env.test` file. Make sure to configure the MongoDB URI and other necessary environment variables in these files according to your setup.

**3. Install Dependencies**

Navigate to each service directory and install the dependencies using npm:

- **Main Service:**

```bash
cd main-service
npm install
```

- **User Service:**

```bash
cd ../user-service
npm install
```

- **Product Service:**

```bash
cd ../product-service
npm install
```

**4. Run Services (Development)**

Start each service in development mode using the following commands:

- **Main Service:**

```bash
cd main-service
npm run dev
```

- **User Service:**

```bash
cd ../user-service
npm run dev
```

- **Product Service:**

```bash
cd ../product-service
npm run dev
```

**5. Build and Start Services (Production)**

For production deployment, build the services and then start them:

- **Main Service:**

```bash
cd main-service
npm run build
npm start
```

- **User Service:**

```bash
cd ../user-service
npm run build
npm start
```

- **Product Service:**

```bash
cd ../product-service
npm run build
npm start
```

**6. Running Tests**

Both User Service and Product Service include basic unit tests. To run the tests, navigate to each service directory and use:

- **User Service:**

```bash
cd user-service
npm test
```

- **Product Service:**

```bash
cd ../product-service
npm test
```

**7. OpenAPI Documentation**

The OpenAPI (Swagger) documentation for each service can be accessed via the following URLs after starting the services:

- **User Service:** http://localhost:5001/api-docs
- **Product Service:** http://localhost:5002/api-docs
