variable "location" {
  type        = string
  default     = "eastus"
  description = "Azure region for resources deployment"
}

variable "environment" {
  type        = string
  default     = "prod"
  description = "Environment name (e.g. dev, staging, prod)"
}

variable "app_name" {
  type        = string
  default     = "azreactcicd"
  description = "Base application name for resource naming"
}

variable "container_image" {
  type        = string
  default     = ""
  description = "Container image URL to deploy (e.g. acrazreactcicdprod.azurecr.io/azure-react-cicd:latest)"
}

variable "cpu" {
  type        = number
  default     = 0.25
  description = "Allocated CPU cores for Container App"
}

variable "memory" {
  type        = string
  default     = "0.5Gi"
  description = "Allocated RAM memory for Container App"
}
