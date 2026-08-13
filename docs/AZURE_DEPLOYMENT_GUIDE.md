# Real Azure Deployment Guide (Terraform & Azure CLI)

This guide documents the exact commands required to deploy this project to real Microsoft Azure infrastructure.

---

## Prerequisites
* [Azure CLI (`az`)](https://learn.microsoft.com/en-us/cli/azure/install-azure-cli) installed.
* [Terraform v1.5+](https://developer.hashicorp.com/terraform/downloads) installed.
* An active Azure Subscription.

---

## Step 1: Azure CLI Authentication

```bash
az login
az account set --subscription "YOUR_AZURE_SUBSCRIPTION_ID"
```

---

## Step 2: Provision Infrastructure using Terraform

```bash
# 1. Navigate to Terraform directory
cd terraform

# 2. Initialize Terraform Azure provider
terraform init

# 3. Preview planned resources
terraform plan -out=tfplan

# 4. Apply infrastructure creation
terraform apply tfplan
```

This provisions the Azure Resource Group, ACR, Log Analytics, and Azure Container App Environment.

---

## Step 3: Build & Push Container Image to Azure Container Registry (ACR)

```bash
# 1. Get ACR Login Server name from Terraform output
export ACR_NAME=$(terraform output -raw acr_login_server)

# 2. Log in to ACR via Azure CLI
az acr login --name $ACR_NAME

# 3. Build & Tag Docker image
docker build -t $ACR_NAME/azure-react-cicd:v1.0.0 ..

# 4. Push image to registry
docker push $ACR_NAME/azure-react-cicd:v1.0.0
```

---

## Step 4: Update Azure Container App Revision

```bash
az containerapp update \
  --name ca-azreactcicd-prod \
  --resource-group rg-azreactcicd-prod \
  --image $ACR_NAME/azure-react-cicd:v1.0.0
```

---

## Step 5: Verify Deployment Endpoint

```bash
export APP_URL=$(terraform output -raw container_app_url)
curl -I $APP_URL/health
```

Expected output: `HTTP/1.1 200 OK` with JSON payload `{"status":"UP","service":"azure-react-cicd"}`.
