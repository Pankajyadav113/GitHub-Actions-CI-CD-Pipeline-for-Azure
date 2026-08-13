output "id" {
  value       = azurerm_log_analytics_workspace.law.id
  description = "ID of Log Analytics Workspace"
}

output "workspace_id" {
  value       = azurerm_log_analytics_workspace.law.workspace_id
  description = "Workspace ID of Log Analytics"
}
