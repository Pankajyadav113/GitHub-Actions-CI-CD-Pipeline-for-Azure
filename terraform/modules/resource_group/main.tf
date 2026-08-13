resource "azurerm_resource_group" "rg" {
  name     = var.name
  location = var.location

  tags = {
    Environment = var.environment
    ManagedBy   = "Terraform-Child-Module"
    Project     = "Azure-React-CICD"
  }
}
