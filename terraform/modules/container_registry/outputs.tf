output "login_server" {
  value       = azurerm_container_registry.acr.login_server
  description = "Login server endpoint for ACR"
}

output "admin_username" {
  value       = azurerm_container_registry.acr.admin_username
  description = "Admin username for ACR"
}

output "admin_password" {
  value       = azurerm_container_registry.acr.admin_password
  sensitive   = true
  description = "Admin password for ACR"
}

output "id" {
  value       = azurerm_container_registry.acr.id
  description = "ID of ACR"
}
