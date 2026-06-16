# DevOps Login Application

A simple Node.js login application connected to MySQL and deployed to Kubernetes using Docker containers.

## Project Overview

This project demonstrates a complete DevOps workflow including:

- Node.js application
- MySQL database
- Docker containerization
- Docker Hub image repository
- Kubernetes deployment on Minikube
- Kubernetes Secrets for credential management
- Git version control with GitHub

## Architecture

┌─────────────┐
│   Browser   │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ Login App   │
│  Node.js    │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│   MySQL     │
│ Database    │
└─────────────┘

## Technologies Used

- Node.js
- MySQL 8.0
- Docker
- Docker Hub
- Kubernetes
- Minikube
- Git
- GitHub

## Project Structure

```text
.
├── Dockerfile
├── package.json
├── server.js
├── init.sql
├── kubernetes
│   ├── login-app-deployment.yaml
│   ├── login-app-service.yaml
│   ├── mysql-deployment.yaml
│   ├── mysql-service.yaml
│   └── secrets.yaml
└── README.md
```

## Docker Build

Build the Docker image:

```bash
docker build -t fashionxavier/simple-login:1.2.2 .
```

Run locally:

```bash
docker run -p 3000:3000 fashionxavier/simple-login:1.2.2
```

Push to Docker Hub:

```bash
docker push fashionxavier/simple-login:1.2.2
```

## Kubernetes Deployment

Create namespaces:

```bash
kubectl create namespace app
kubectl create namespace database
```

Deploy MySQL:

```bash
kubectl apply -f kubernetes/mysql-deployment.yaml
kubectl apply -f kubernetes/mysql-service.yaml
```

Create database secret:

```bash
kubectl apply -f kubernetes/secrets.yaml
```

Deploy application:

```bash
kubectl apply -f kubernetes/login-app-deployment.yaml
kubectl apply -f kubernetes/login-app-service.yaml
```

Verify deployment:

```bash
kubectl get pods -A
kubectl get svc -A
```

## Updating the Application

Build a new image:

```bash
docker build -t fashionxavier/simple-login:1.2.2 .
```

Push image:

```bash
docker push fashionxavier/simple-login:1.2.2
```

Update Kubernetes deployment:

```bash
kubectl set image deployment/login-app \
login-app=fashionxavier/simple-login:1.2.2 \
-n app
```

Check rollout status:

```bash
kubectl rollout status deployment/login-app -n app
```

## Troubleshooting

### ImagePullBackOff

Cause:
- Incorrect image name
- Image not pushed to Docker Hub
- Architecture mismatch (ARM64 vs AMD64)

Fix:

```bash
docker buildx build \
--platform linux/amd64,linux/arm64 \
-t fashionxavier/simple-login:1.2.2 \
--push .
```

### CreateContainerConfigError

Cause:
- Missing Kubernetes Secret

Verify:

```bash
kubectl get secrets -n app
```

Create Secret:

```bash
kubectl create secret generic db-secret \
--from-literal=DB_USER=testuser \
--from-literal=DB_PASSWORD=password \
-n app
```

## Lessons Learned

During this project I gained hands-on experience with:

- Git and GitHub workflows
- Docker image creation and management
- Multi-platform image builds for Apple Silicon (ARM64)
- Kubernetes deployments and services
- Kubernetes Secrets
- Pod troubleshooting
- Application-to-database connectivity
- Container orchestration using Minikube

## Future Improvements

- Terraform infrastructure provisioning
- GitHub Actions CI/CD pipeline
- AWS deployment
- Ingress controller
- Prometheus monitoring
- Grafana dashboards

## Author

Olaniran Fasoranti

GitHub: https://github.com/fashionxavier
