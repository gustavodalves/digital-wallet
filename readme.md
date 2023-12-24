# DigitalWallet

## Overview

DigitalWallet is a TypeScript-based digital wallet project designed to facilitate secure money transfers between users and merchants. This project draws inspiration from challenges outlined in a [reference repository](https://github.com/PicPay/picpay-desafio-backend).

## Project Objectives

The primary goal of DigitalWallet is to create a simplified digital wallet system with a strong emphasis on TypeScript and the integration of essential design concepts:

### User Registration

- Collect user information: Full Name, CPF, email, and Password.
- Ensure uniqueness of CPF/CNPJ and email addresses in the system.

### Money Transfer

- Enable users to transfer money to both other users and merchants.
- Merchants can only receive transfers.

### Balance Validation

- Verify user balances before completing a transfer.

### External Authorization Service

- Consult an external authorization service before finalizing transfers. Utilize the [Authorization Mock](https://run.mocky.io/v3/8fafdd68-a090-496f-8c9a-3442cf30dae6) for simulation.

### Transaction Handling

- Treat the transfer operation as a transaction to handle inconsistencies, ensuring money returns to the sender's wallet in case of any issues.

### Notification Service

- Implement a notification service for users and merchants upon receiving payments. Use the [Notification Mock](http://o4d9z.mocklab.io/notify) for simulation. Acknowledge that this service may experience occasional unavailability or instability.

### Technology Stack

- **TypeScript:** The entire project is developed in TypeScript to leverage static typing and enhance code maintainability.
- **Docker:** Utilize a Dockerfile and Docker Compose for containerization.
- **Automated Tests:** Implement thorough automated testing to ensure the robustness of the system.

### Design Concepts

#### Domain-Driven Design (DDD)

- Embrace DDD for a strategic and tactical approach to modeling the system's core domains, ensuring alignment with business goals.

#### SOLID Principles

- Follow SOLID principles (Single Responsibility, Open-Closed, Liskov Substitution, Interface Segregation, Dependency Inversion) to promote a modular and maintainable codebase.

## Project Dedication

This project represents a significant investment of time and dedication. The goal is to provide a reliable and efficient digital wallet solution, emphasizing secure transactions and a seamless user experience.

**Note:** This README serves as a high-level overview. Detailed documentation, including setup instructions and code explanations, can be found within the project's source code.