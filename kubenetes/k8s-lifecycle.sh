#!/bin/bash
set -e

# VARIABLES
NAMESPACE=beginner
POD_NAME=myapp-pod
SERVICE_NAME=myapp-service
IMAGE=docker.io/fashionxavier/php-container:php_test
PORT=80

echo "🚀 Starting Kubernetes lifecycle automation..."

echo "👉 Creating namespace..."
kubectl get ns $NAMESPACE >/dev/null 2>&1 || kubectl create ns $NAMESPACE

echo "👉 Creating pod..."
kubectl run $POD_NAME \
  --image=$IMAGE \
  --restart=Never \
  --port=$PORT \
  -n $NAMESPACE

echo "⏳ Waiting for pod to be ready..."
kubectl wait --for=condition=Ready pod/$POD_NAME -n $NAMESPACE --timeout=60s

echo "👉 Exposing pod as service..."
kubectl expose pod $POD_NAME \
  --name=$SERVICE_NAME \
  --port=$PORT \
  --target-port=$PORT \
  --type=ClusterIP \
  -n $NAMESPACE

echo "📦 Current resources:"
kubectl get all -n $NAMESPACE

echo "🧪 Testing pause (5 seconds)..."
sleep 5

echo "🧹 Deleting service..."
kubectl delete svc $SERVICE_NAME -n $NAMESPACE

echo "🧹 Deleting pod..."
kubectl delete pod $POD_NAME -n $NAMESPACE

echo "🧹 Deleting namespace..."
kubectl delete ns $NAMESPACE

echo "✅ Kubernetes lifecycle completed successfully!"

