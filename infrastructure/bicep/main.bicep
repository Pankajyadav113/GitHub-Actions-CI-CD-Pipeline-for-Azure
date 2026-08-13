// ==============================================================================
// Azure Bicep Template for Azure Container Apps & ACR Provisioning
// ==============================================================================

@description('Azure region location for resources')
param location string = resourceGroup().location

@description('Target environment name')
param environment string = 'prod'

@description('Application base name')
param appName string = 'azreactcicd'

var resourceSuffix = '${appName}-${environment}'

// 1. Azure Container Registry
resource acr 'Microsoft.ContainerRegistry/registries@2023-07-01' = {
  name: replace('acr${resourceSuffix}', '-', '')
  location: location
  sku: {
    name: 'Basic'
  }
  properties: {
    adminUserEnabled: true
  }
}

// 2. Log Analytics Workspace
resource logAnalytics 'Microsoft.OperationalInsights/workspaces@2022-10-01' = {
  name: 'law-${resourceSuffix}'
  location: location
  properties: {
    sku: {
      name: 'PerGB2018'
    }
    retentionInDays: 30
  }
}

// 3. Azure Container Apps Environment
resource containerEnv 'Microsoft.App/managedEnvironments@2023-05-01' = {
  name: 'cae-${resourceSuffix}'
  location: location
  properties: {
    appLogsConfiguration: {
      destination: 'log-analytics'
      logAnalyticsConfiguration: {
        customerId: logAnalytics.properties.customerId
        sharedKey: logAnalytics.listKeys().primarySharedKey
      }
    }
  }
}

// 4. Azure Container App
resource containerApp 'Microsoft.App/containerApps@2023-05-01' = {
  name: 'ca-${resourceSuffix}'
  location: location
  properties: {
    managedEnvironmentId: containerEnv.id
    configuration: {
      ingress: {
        external: true
        targetPort: 80
        allowInsecure: false
      }
    }
    template: {
      containers: [
        {
          name: 'react-dashboard'
          image: 'mcr.microsoft.com/azuredocs/aci-helloworld:latest'
          resources: {
            cpu: json('0.25')
            memory: '0.5Gi'
          }
          probes: [
            {
              type: 'Readiness'
              httpGet: {
                path: '/health'
                port: 80
              }
            }
          ]
        }
      ]
    }
  }
}

output containerAppFQDN string = containerApp.properties.configuration.ingress.fqdn
output acrLoginServer string = acr.properties.loginServer
