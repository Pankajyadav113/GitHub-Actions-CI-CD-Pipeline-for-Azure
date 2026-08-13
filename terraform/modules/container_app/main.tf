resource "azurerm_container_app_environment" "env" {
  name                       = var.env_name
  location                   = var.location
  resource_group_name        = var.resource_group_name
  log_analytics_workspace_id = var.log_analytics_workspace_id

  tags = {
    Environment = var.environment
    ManagedBy   = "Terraform-Child-Module"
    Project     = "Azure-React-CICD"
  }
}

resource "azurerm_container_app" "app" {
  name                         = var.name
  container_app_environment_id = azurerm_container_app_environment.env.id
  resource_group_name          = var.resource_group_name
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
    server               = var.acr_login_server
    username             = var.acr_admin_username
    password_secret_name = "acr-password"
  }

  secret {
    name  = "acr-password"
    value = var.acr_admin_password
  }

  tags = {
    Environment = var.environment
    ManagedBy   = "Terraform-Child-Module"
    Project     = "Azure-React-CICD"
  }
}
