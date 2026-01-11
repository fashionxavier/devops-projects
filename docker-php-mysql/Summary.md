# Project Summary

This project demonstrates how to run a simple PHP application together with a MySQL database using Docker containers. It is an introductory DevOps / containerization project intended to show how services can be separated into containers and connected on a Docker network without using Docker Compose.

Goals
- Show how to containerize a PHP application and a MySQL database.
- Demonstrate container-to-container networking with Docker.
- Provide a minimal, reproducible example that can be extended.

###Technologies used
- Docker (containerization)
- Docker Network (to enable communication across the containers)
- PHP (application code)
- MySQL (relational database)

###Architecture
```
docker-php-mysql
├── mysql
│   ├── Dockerfile
│   └── init.sql
├── php
│   ├── config.php
│   ├── Dockerfile
│   ├── index.php
│   └── login.php
├── LICENSE
├── main.tf
└── README.md
```
This indicates two Docker containers (one for PHP and one for MySQL) connected on a user-defined network, allowing the PHP app to access the database by container name.

What the project includes
- A sample PHP application (example pages and a simple login/config).
- A MySQL service (initialization SQL placed in `mysql/init.sql`).
- Dockerfile(s) to build both services.
- (Optionally) Terraform files / other infra files under `main.tf` for deployment examples.

Quick start (without Docker Compose)
1. From the project root, create a user-defined bridge network so containers can reach each other by name:
   ```
   docker network create app-network
   ```

2. Build the MySQL container.
  ```
  sudo docker build -t custom-mysql .
  ```
3. Run the MySQL container and the Dockerfile configuration
   ```
   docker run -d |                                   
  --name mysql-container |
  --network app-network |
  -p 3306:3306 |
  custom-mysql
  ```
   ```
   FROM mysql:8.0
   ENV MYSQL_ROOT_PASSWORD=root
   ENV MYSQL_DATABASE=testdb
   ENV MYSQL_USER=testuser
   ENV MYSQL_PASSWORD=testpass
   COPY init.sql /docker-entrypoint-initdb.d/
   ```
4.  Build the php container.
    ```
   sudo docker build -t php-frontend .
    ``` 
5. Run the php container.

   ```
    docker run -d |                
  --name php-container |
  --network app-network |
  -p 8082:80 |
  php-frontend
    ```
   ```
   FROM php:8.2-apache
   RUN docker-php-ext-install mysqli
   COPY . /var/www/html/
   EXPOSE 80
   ```
   
   

