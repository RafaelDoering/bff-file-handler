# BFF File Handler
## 🎯 Summary
<p align="justify">
An application for file uploads.
</p>

## 📊 Features
| Feature | Description | Status |
| :-: | :-: | :-: |
| **File Handling and Storage** | The service will expose a public RESTful endpoint to securely handle multipart/form-data uploads of ~250MB CSV files and write them to disk efficiently. | Done, there is one endpoint for uploading and another for deleting files, both with authorization. The writing is made with multer. |
| **Dynamic Throttling** | Implement a dynamic rate limiter that adjusts the allowed request rate based on real-time system metrics, such as CPU pressure and available memory. | In progress |
| **Health Endpoint** | Expose a health endpoint that reports on the system's CPU pressure, available memory, and the health status of all external dependencies. | Done, its the /health endpoint |
| **Resiliency and Fault Tolerance** | Use circuit breaker patterns and implement retries with exponential backoff to handle downstream failures and transient errors. | Done only for incoming requests using kubernetes |
| **Testing** | Conduct unit and integration tests to ensure the service can handle concurrent uploads of 250MB CSV files, dynamic throttling works as intended, and the system remains resilient during failures. | Partially done, there is unit and integration tests for the file upload, delete, signup and login. There is also a simple load test using k6 |
| **Rate Limiting and Concurrency** | Apply a rate limiter to prevent more than 1 request per 10 seconds per client and ensure no more than 5 concurrent file processing operations. | In progress |
| **Authentication** | Secure endpoints with Basic Authentication and ensure the secure management of credentials. | Done with email, password authentication. |
| **Performance Metrics and Logging** | Implement structured logging to provide detailed metrics and logs for each file upload, correlating them with request IDs. | Partially done, there is a log for the file upload correlating the file with the user email |
| **Documentation** | Provide clear documentation covering endpoint usage, expected behavior under load, and error handling. | In progress |
| **Operations** | Optionally, create packaging instructions and deployment templates for CI/CD. | Partially done with github actions CI for running tests |

## ⌨️ Commands
| Command | Description |
| :-: | :-: |
| `npm run dev` | Start the application in development mode on http://localhost:3001 |
| `npm run build` | Build the application |
| `npm run start` | Start the application on http://localhost:3001 |
| `npm run test` | Run tests |
| `npm run swagger` | Update swagger docs |

## 🚀 How to run

### 📝 Requirements
- NodeJS 20+
- Docker 27

### ⬆️ Run the application

#### 💻 Node

1. Run `npm run start` to start the application
2. Access http://localhost:3001

#### 🐳 Docker

1. Run `docker-compose up --build` to start the application
2. Access http://localhost:3001

## 📄 Swagger
This application has swagger running on http://localhost:3001/docs

### 🚀 Deploy

[Kubernetes](kubernetes/README.md)

## 🏙️ Architecture

| Layer | Responsibility |
| :-: | :-:|
| __app__ | Application layer |
| __domain__ | Domain models |
| __infra__ | Adapters for the application and domain layer interfaces |
| __ui__ | Interface with the outside word |

## TODO

- Dynamic Throttling
- Error handling is very minimal
- CD Pipeline
- Upload files to some global storage (now is only on each server)
- Get of a file
