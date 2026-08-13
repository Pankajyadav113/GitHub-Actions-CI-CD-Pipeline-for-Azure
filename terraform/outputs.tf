output "resource_group_name" {
  value       = module.resource_group.name
  description = "Name of the created Azure Resource Group"
}

output "acr_login_server" {
  value       = module.container_registry.login_server
  description = "Login server endpoint for Azure Container Registry"
}

output "container_app_url" {
  value       = module.container_app.app_url
  description = "Public FQDN endpoint URL for Azure Container App"
}

output "log_analytics_workspace_id" {
  value       = module.log_analytics.workspace_id
  description = "Workspace ID for Azure Log Analytics"
}
