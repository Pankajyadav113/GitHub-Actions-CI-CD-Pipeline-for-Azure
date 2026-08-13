variable "name" {
  type        = string
  description = "Name of Log Analytics Workspace"
}

variable "location" {
  type        = string
  description = "Azure region location"
}

variable "resource_group_name" {
  type        = string
  description = "Resource Group Name"
}

variable "sku" {
  type        = string
  default     = "PerGB2018"
  description = "SKU for Log Analytics"
}

variable "retention_in_days" {
  type        = number
  default     = 30
  description = "Log retention period in days"
}

variable "environment" {
  type        = string
  description = "Target environment name"
}
