# Restaurant Order App 🍕🥗🥡

## Overview
This project is a **Restaurant Order Application** that allows users to browse restaurants, view their dishes, and place orders. It includes different user roles (Admin, Owner, and Client) with distinct functionalities for each role.

## Features
- **Client**
  - Browse restaurants and view menus.
  - Add dishes to the cart and place orders.
  - View past orders and manage personal information.

- **Owner**
  - Manage restaurant details.
  - Add, update, or remove dishes.
  - View orders placed in the restaurant, and delete if needed.

- **Admin**
  - Manage all restaurants and their owners.
  - Create and delete restaurant owners.

## Stack

### Backend
- **Node.js** and **Express**
- **Sequelize** ORM
- **MySQL**
- **JWT (JSON Web Token)**
- **bcrypt** for password hashing

### Frontend
- **React.js**
- **Tailwind CSS**
- **Axios** for HTTP requests

## Installation

1. Clone this repository

2. Navigate to the project folder

3. Install dependencies for both backend and frontend:
    ```
    cd back
    npm install
    cd ../front
    npm install
    ```
4. Setup the database:
- The database containing sample data is located in the `/db` folder.
- Import the `.sql` file into your MySQL database.
- Update environment variables in `.env` files inside `back` and `front` folders.

OR

- In this file `/back/src/utils/sequelize.js`, uncomment this part to recreate an empty one:

    ```
    // await sequelize.sync({
    //   alter: true,
    // });
    ```

## Usage

- Start Backend Server
    ```
    cd back
    npm run dev
    ```
- Start Frontend Server
    ```
    cd ../front
    npm run dev
    ```
- Open your browser and navigate to:
    ```
    http://localhost:5173
    ```

## NB
If you use the **sample DB**, you can connect to the corresponding user accounts via:
- **USER**: email: user@gmail.com, password: 12345
- **OWNER**: email: owner@gmail.com | owner1@gmail.com | owner2@gmail.com, password: 12345
- **ADMIN**: email: admin@gmail.com, password: 12345

