# Project Summary

This project demonstrates how to run a simple PHP application together with a MySQL database using Docker containers. It is an introductory DevOps / containerization project intended to show how services can be built, configured, and run in isolated containers.

Technologies used
- Docker (containerization)
- Docker Network (to enable communication across the containers)
- PHP (application code)
- MySQL (relational database)
  The architectural design of the project is as seen below:
  ├── docker-php-mysql
│   ├── mysql
│   │   ├── Dockerfile
│   │   └── init.sql
│   └── php
│       ├── config.php
│       ├── Dockerfile
│       ├── index.php
│       └── login.php
├── LICENSE
├── main.tf
└── README.md
: This indicates that we bhave two Docker containers, one each for php and mysql.

What the project includes
- A PHP application (sample files)
- A MySQL service running in a separate container
- Dockerfile(s) to build and run the services

Quick start for mysql (example)
FROM mysql:8.0

ENV MYSQL_ROOT_PASSWORD=root
ENV MYSQL_DATABASE=testdb
ENV MYSQL_USER=testuser
ENV MYSQL_PASSWORD=testpass

COPY init.sql /docker-entrypoint-initdb.d/

