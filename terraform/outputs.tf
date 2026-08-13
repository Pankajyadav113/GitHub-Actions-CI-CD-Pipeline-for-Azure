output "resource_group_name" {
  value       = azurerm_resource_group.rg.name
  description = "Name of the created Azure Resource Group"
}

output "acr_login_server" {
  value       = azurerm_container_registry.acr.login_server
  description = "Login server endpoint for Azure Container Registry"
}

output "container_app_url" {
  value       = "https://${azurerm_container_app.app.ingress[0].fqdn}"
  description = "Public FQDN endpoint URL for Azure Container App"
}

output "log_analytics_workspace_id" {
  value       = azurerm_log_analytics_workspace.law.workspace_id
  description = "Workspace ID for Azure Log Analytics"
}
