output "app_url" {
  value       = "https://${azurerm_container_app.app.ingress[0].fqdn}"
  description = "Public URL endpoint of Container App"
}

output "fqdn" {
  value       = azurerm_container_app.app.ingress[0].fqdn
  description = "FQDN of Container App"
}

output "id" {
  value       = azurerm_container_app.app.id
  description = "ID of Container App"
}
