variable "name" {
  type        = string
  description = "Name of the Azure Container Registry"
}

variable "resource_group_name" {
  type        = string
  description = "Resource Group Name"
}

variable "location" {
  type        = string
  description = "Azure region location"
}

variable "sku" {
  type        = string
  default     = "Basic"
  description = "SKU for Azure Container Registry"
}

variable "environment" {
  type        = string
  description = "Target environment name"
}
