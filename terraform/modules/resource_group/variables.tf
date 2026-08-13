variable "name" {
  type        = string
  description = "Name of the resource group"
}

variable "location" {
  type        = string
  description = "Azure region location"
}

variable "environment" {
  type        = string
  description = "Target environment name"
}
