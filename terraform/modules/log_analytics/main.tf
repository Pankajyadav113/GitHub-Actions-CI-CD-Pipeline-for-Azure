resource "azurerm_log_analytics_workspace" "law" {
  name                = var.name
  location            = var.location
  resource_group_name = var.resource_group_name
  sku                 = var.sku
  retention_in_days   = var.retention_in_days

  tags = {
    Environment = var.environment
    ManagedBy   = "Terraform-Child-Module"
    Project     = "Azure-React-CICD"
  }
}
