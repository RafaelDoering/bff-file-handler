# BFF File Handler
## 🎯 Summary
<p align="justify">
An application for file uploads.
</p>

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
| __app__ | Applications login |
| __domain__ | Domain models |
| __infra__ | Infrastructure |
| __ui__ | Interface with the outside word |
