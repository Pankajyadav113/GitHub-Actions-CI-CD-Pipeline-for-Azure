# ==============================================================================
# Terraform Infrastructure-as-Code Configuration for Azure Deployment
# Provisioning: Resource Group, ACR, Log Analytics, Azure Container App Env
# ==============================================================================

terraform {
  required_version = ">= 1.5.0"

  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 3.100.0"
    }
  }
}

provider "azurerm" {
  features {}
}

# 1. Azure Resource Group
resource "azurerm_resource_group" "rg" {
  name     = "rg-${var.app_name}-${var.environment}"
  location = var.location

  tags = {
    Environment = var.environment
    ManagedBy   = "Terraform"
    Project     = "Azure-React-CICD"
  }
}

# 2. Azure Container Registry (ACR)
resource "azurerm_container_registry" "acr" {
  name                = "acr${var.app_name}${var.environment}"
  resource_group_name = azurerm_resource_group.rg.name
  location            = azurerm_resource_group.rg.location
  sku                 = "Basic"
  admin_enabled       = true

  tags = azurerm_resource_group.rg.tags
}

# 3. Log Analytics Workspace for Monitoring & Observability
resource "azurerm_log_analytics_workspace" "law" {
  name                = "law-${var.app_name}-${var.environment}"
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name
  sku                 = "PerGB2018"
  retention_in_days   = 30

  tags = azurerm_resource_group.rg.tags
}

# 4. Azure Container App Environment
resource "azurerm_container_app_environment" "env" {
  name                       = "cae-${var.app_name}-${var.environment}"
  location                   = azurerm_resource_group.rg.location
  resource_group_name        = azurerm_resource_group.rg.name
  log_analytics_workspace_id = azurerm_log_analytics_workspace.law.id

  tags = azurerm_resource_group.rg.tags
}

# 5. Azure Container App (Managed Web Application Container)
resource "azurerm_container_app" "app" {
  name                         = "ca-${var.app_name}-${var.environment}"
  container_app_environment_id = azurerm_container_app_environment.env.id
  resource_group_name          = azurerm_resource_group.rg.name
  revision_mode                = "Single"

  template {
    container {
      name   = "react-dashboard"
      image  = var.container_image != "" ? var.container_image : "mcr.microsoft.com/azuredocs/aci-helloworld:latest"
      cpu    = var.cpu
      memory = var.memory

      readiness_probe {
        transport = "HTTP"
        port      = 80
        path      = "/health"
      }

      liveness_probe {
        transport = "HTTP"
        port      = 80
        path      = "/health"
      }
    }
  }

  ingress {
    allow_insecure_connections = false
    external_enabled           = true
    target_port                = 80

    traffic_weight {
      percentage      = 100
      latest_revision = true
    }
  }

  registry {
    server               = azurerm_container_registry.acr.login_server
    username             = azurerm_container_registry.acr.admin_username
    password_secret_name = "acr-password"
  }

  secret {
    name  = "acr-password"
    value = azurerm_container_registry.acr.admin_password
  }

  tags = azurerm_resource_group.rg.tags
}
