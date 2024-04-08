#!/bin/bash

# List of services
services=("clients/admin" "clients/lecturer" "clients/student" "servers/admin" "servers/lecturer" "servers/student")

# Loop through each service
for service in "${services[@]}"; do
    # Change directory to the service
    cd "$service" || exit

    # Check if node_modules directory exists
    if [ -d "node_modules" ]; then
        echo "node_modules directory already exists for $service. Skipping npm install."
    else
        # Install dependencies
        echo "Installing dependencies for $service..."
        npm install
    fi

    # Start the service
    echo "Starting $service..."
    npm start

    # Move back to the parent directory
    cd ..
done
