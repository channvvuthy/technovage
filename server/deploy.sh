#!/bin/bash

# Step 1: Bring up the Docker containers
echo "Starting Docker containers..."
docker-compose up -d

# Step 2: Wait until the dev_app container is healthy or running
echo "Waiting for mysql container to be up for 30 seconds..."
sleep 30
echo "mysql container is up and running."

# Step 3: Install dependencies via composer
echo "Install dependencies ..."
docker exec -it dev_app sh -c "composer install"

# Step 4: Run the artisan migrate command inside the dev_app container
echo "Running artisan migrate..."
docker exec -it dev_app sh -c "php artisan migrate"

# Step 5: Run the script to create a default user.
echo "Running artisan db:seed..."
docker exec -it dev_app sh -c "php artisan db:seed"

echo "Deployment completed."
