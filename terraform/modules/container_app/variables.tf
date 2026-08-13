variable "name" {
  type        = string
  description = "Container App Name"
}

variable "env_name" {
  type        = string
  description = "Container App Environment Name"
}

variable "resource_group_name" {
  type        = string
  description = "Resource Group Name"
}

variable "location" {
  type        = string
  description = "Azure region location"
}

variable "log_analytics_workspace_id" {
  type        = string
  description = "Log Analytics Workspace ID"
}

variable "acr_login_server" {
  type        = string
  description = "ACR login server URL"
}

variable "acr_admin_username" {
  type        = string
  description = "ACR admin username"
}

variable "acr_admin_password" {
  type        = string
  sensitive   = true
  description = "ACR admin password"
}

variable "container_image" {
  type        = string
  default     = ""
  description = "Container image URL"
}

variable "cpu" {
  type        = number
  default     = 0.25
  description = "CPU core allocation"
}

variable "memory" {
  type        = string
  default     = "0.5Gi"
  description = "Memory allocation"
}

variable "environment" {
  type        = string
  description = "Target environment name"
}
