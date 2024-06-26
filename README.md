# Project Setup Guide

This guide will help you set up and run the project using either Docker or traditional methods. Follow the steps below according to your preferred method.

## Using Docker

### Running the Server

1. Navigate to the server directory:
    ```sh
    cd server
    ```

2. Run the deployment script:
    ```sh
    ./deploy.sh
    ```
   Alternatively, you can use `docker-compose` directly, but using `./deploy.sh` is recommended:
    ```sh
    docker-compose up -d
    ```

### Running the Frontend

1. Navigate to the client directory:
    ```sh
    cd client
    ```

2. Run the deployment script:
    ```sh
    ./deploy.sh
    ```
   Alternatively, you can use `docker-compose` directly, but using `./deploy.sh` is recommended:
    ```sh
    docker-compose up -d
    ```

### Configuration

Make sure your `.env` file exists in both the server and client directories. Ensure the `API_URL` variable in the client `.env` file is correctly set to the server URL.

### Accessing the Application

- **Client:** [http://localhost:3000](http://localhost:3000)
- **Server:** [http://localhost:8000](http://localhost:8000)

## Using Traditional Methods

### Running the Server

1. Navigate to the server directory:
    ```sh
    cd server
    ```

2. Install dependencies using Composer:
    ```sh
    composer install
    ```

3. Connect to the MySQL server:
    - Ensure you have already installed the MySQL server and created the database.
    - Update your `.env` file with the appropriate database credentials.

4. Run database migrations:
    ```sh
    php artisan migrate
    ```

5. Run database seeders:
    ```sh
    php artisan db:seed
    ```

6. Start the server:
    ```sh
    php artisan serve
    ```

### Running the Frontend

1. Navigate to the client directory:
    ```sh
    cd client
    ```

2. Check that the `.env` file exists and the `API_URL` variable is correctly set.

3. Install dependencies using npm:
    ```sh
    npm install
    ```

4. Start the development server:
    ```sh
    npm run dev
    ```

### Accessing the Application

- **Client:** [http://localhost:3000](http://localhost:3000)
- **Server:** [http://localhost:8000](http://localhost:8000)

## Default User for Login

You can log in using the default credentials:
- **Email:** channvuthyit@gmail.com
- **Password:** password

Please ensure to change these credentials in a production environment.

## Notes

- When using Docker, it is recommended to use the `./deploy.sh` script to ensure all services are properly initialized and ready.
- Ensure that the `.env` files are correctly configured before starting the server and client.
