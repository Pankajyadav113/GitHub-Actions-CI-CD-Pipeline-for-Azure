# ==============================================================================
# Parent / Root Module Configuration
# Instantiates Child Modules: Resource Group, ACR, Log Analytics, Container App
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

# 1. Child Module — Resource Group
module "resource_group" {
  source      = "./modules/resource_group"
  name        = "rg-${var.app_name}-${var.environment}"
  location    = var.location
  environment = var.environment
}

# 2. Child Module — Azure Container Registry (ACR)
module "container_registry" {
  source              = "./modules/container_registry"
  name                = "acr${var.app_name}${var.environment}"
  resource_group_name = module.resource_group.name
  location            = module.resource_group.location
  environment         = var.environment
}

# 3. Child Module — Log Analytics Workspace
module "log_analytics" {
  source              = "./modules/log_analytics"
  name                = "law-${var.app_name}-${var.environment}"
  resource_group_name = module.resource_group.name
  location            = module.resource_group.location
  environment         = var.environment
}

# 4. Child Module — Azure Container App & Environment
module "container_app" {
  source                     = "./modules/container_app"
  name                       = "ca-${var.app_name}-${var.environment}"
  env_name                   = "cae-${var.app_name}-${var.environment}"
  resource_group_name        = module.resource_group.name
  location                   = module.resource_group.location
  log_analytics_workspace_id = module.log_analytics.id
  acr_login_server           = module.container_registry.login_server
  acr_admin_username         = module.container_registry.admin_username
  acr_admin_password         = module.container_registry.admin_password
  container_image            = var.container_image
  cpu                        = var.cpu
  memory                     = var.memory
  environment                = var.environment
}
