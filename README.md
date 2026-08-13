# Enterprise Azure React CI/CD Pipeline & Infrastructure-as-Code

![CI Status](https://img.shields.io/badge/CI-Passing-10b981?style=for-the-badge&logo=githubactions)
![Terraform](https://img.shields.io/badge/IaC-Terraform_v1.5+-7B42BC?style=for-the-badge&logo=terraform)
![Bicep](https://img.shields.io/badge/IaC-Azure_Bicep-0078d4?style=for-the-badge&logo=microsoftazure)
![DevSecOps](https://img.shields.io/badge/Security-Trivy_%26_Hadolint-ef4444?style=for-the-badge&logo=aquasecurity)
![Docker](https://img.shields.io/badge/Docker-Multi--stage_Hardened-0078d4?style=for-the-badge&logo=docker)
![Cost](https://img.shields.io/badge/Cost-%240.00_CI-success?style=for-the-badge)

---

## 1. Executive Summary & Overview

This repository demonstrates a complete, production-grade **DevOps & Cloud Engineering Suite** for containerized applications targeting **Microsoft Azure**.

Beyond web application continuous integration, this project provides a full **Infrastructure-as-Code (IaC)** foundation (**Terraform** & **Bicep**), automated **DevSecOps security scanning** (**Trivy** & **Hadolint**), production **Nginx security hardening**, container health probes (`/health`), and automated multi-job **GitHub Actions CI/CD workflows**.

All validation workflows run **100% cost-free** on GitHub-hosted runners (`ubuntu-latest`) without requiring paid cloud resources or secret management overhead.

---

## 2. Key DevOps Capabilities Demonstrated

* 🏗️ **Infrastructure-as-Code (IaC)**: Complete Terraform (`terraform/`) and Azure Bicep (`infrastructure/bicep/`) modules for Azure Resource Groups, Azure Container Registry (ACR), Log Analytics Workspaces, and Azure Container Apps.
* 🛡️ **DevSecOps & Vulnerability Scanning**: Integrated **Trivy** repository vulnerability scanner, **Hadolint** Dockerfile best-practices checker, and `npm audit`.
* 🔒 **Container Security Hardening**: Non-root `USER nginx` execution, `HEALTHCHECK` probe querying `/health`, and production HTTP security headers (`X-Frame-Options`, `Content-Security-Policy`, gzip).
* ⚡ **Multi-Job GitHub Actions Grid**: Parallel CI jobs for Quality Assurance, Terraform Syntax Validation, Security Auditing, and Docker Buildx caching.
* 📜 **Automated PowerShell & Bash Scripts**: One-click local validation suite (`scripts/devops-setup.ps1` & `scripts/devops-setup.sh`).
* 📘 **Enterprise Operational Runbooks**: In-depth architecture specification ([`docs/ARCHITECTURE.md`](file:///d:/Projects/New_Projects/docs/ARCHITECTURE.md)), deployment guide ([`docs/AZURE_DEPLOYMENT_GUIDE.md`](file:///d:/Projects/New_Projects/docs/AZURE_DEPLOYMENT_GUIDE.md)), and troubleshooting runbook ([`docs/TROUBLESHOOTING.md`](file:///d:/Projects/New_Projects/docs/TROUBLESHOOTING.md)).

---

## 3. DevOps Architecture Blueprint

### Multi-Job CI/CD Execution Pipeline (GitHub Runner)

```text
                  Developer
                      |
                      | git push / Pull Request
                      v
             GitHub Repository
                      |
                      v
        [ GitHub Actions Workflow ]
                      |
     +----------------+----------------+----------------+----------------+
     |                                 |                                 |
     v                                 v                                 v
[ Job 1: QA & Tests ]       [ Job 2: Terraform IaC ]       [ Job 3: DevSecOps Scan ]
  - ESLint Checks             - terraform fmt check          - Hadolint Docker Linter
  - Vitest Unit Tests         - terraform init               - Trivy Vulnerability Scan
  - Vite React Build          - terraform validate           - npm audit
     |                                 |                                 |
     +----------------+----------------+----------------+----------------+
                                       |
                                       v
                           [ Job 4: Docker Buildx ]
                           - Multi-Stage Nginx Build
                           - Healthcheck Probe Setup
                           - Container Image Validation
                                       |
                                       v
                           [ ✓ Azure-Ready Validated ]
```

---

## 4. Technology Stack Matrix

| Domain | Engineering Tools & Frameworks |
| :--- | :--- |
| **Infrastructure-as-Code** | HashiCorp Terraform v1.5+, Azure Bicep, Azure CLI |
| **Cloud Services (Conceptual)** | Azure Container Registry (ACR), Azure Container Apps, Log Analytics |
| **Containerization** | Docker Multi-stage, Docker Buildx, Nginx Alpine Hardened |
| **CI/CD Automation** | GitHub Actions, YAML Workflows, GitHub Runners (`ubuntu-latest`) |
| **DevSecOps Security** | Aqua Security Trivy, Hadolint, npm audit |
| **Code Quality & Testing** | ESLint Flat Config, Vitest, React Testing Library, JSDOM |
| **Application Layer** | React 18, Vite, Lucide Icons, Glassmorphic Dashboard UI |

---

## 5. Repository Directory Structure

```text
azure-react-github-actions-cicd/
│
├── .github/
│   └── workflows/
│       ├── azure-ci.yml        # Multi-job enterprise CI/CD pipeline
│       └── pr-check.yml        # Pull Request validation workflow
│
├── docs/
│   ├── ARCHITECTURE.md         # Deep-dive architecture & security baseline
│   ├── AZURE_DEPLOYMENT_GUIDE.md # Step-by-step real Azure deployment guide
│   └── TROUBLESHOOTING.md      # Incident troubleshooting runbook
│
├── infrastructure/
│   └── bicep/
│       └── main.bicep          # Native Azure Bicep IaC template
│
├── scripts/
│   ├── devops-setup.ps1        # PowerShell local validation script
│   └── devops-setup.sh         # Bash local validation script
│
├── terraform/
│   ├── main.tf                 # Primary Terraform IaC configuration
│   ├── variables.tf            # Configurable variable definitions
│   ├── outputs.tf              # Provisioning deployment outputs
│   └── terraform.tfvars.example # Example environment variables
│
├── src/
│   ├── App.jsx                 # Azure DevOps CI/CD Dashboard component
│   ├── App.css                 # Dashboard component styling
│   ├── index.css               # Azure theme design tokens
│   ├── main.jsx                # React root entry point
│   └── setupTests.js           # Vitest DOM matchers setup
│
├── tests/
│   └── App.test.jsx            # Vitest unit test suite
│
├── .dockerignore               # Docker context exclude file
├── .gitignore                  # Git tracking exclude file
├── Dockerfile                  # Hardened multi-stage Dockerfile
├── eslint.config.js            # ESLint flat config setup
├── index.html                  # HTML entry point with fonts
├── nginx.conf                  # Hardened Nginx config with /health
├── package.json                # Dependencies and scripts
├── vite.config.js              # Vite & Vitest configuration
└── README.md                   # Enterprise documentation
```

---

## 6. Infrastructure-as-Code (Terraform) Summary

Path: [`terraform/main.tf`](file:///d:/Projects/New_Projects/terraform/main.tf)

The Terraform configuration provisions complete Azure cloud infrastructure:
1. **Azure Resource Group** (`azurerm_resource_group.rg`)
2. **Azure Container Registry** (`azurerm_container_registry.acr`)
3. **Log Analytics Workspace** (`azurerm_log_analytics_workspace.law`)
4. **Azure Container App Environment** (`azurerm_container_app_environment.env`)
5. **Azure Container App** (`azurerm_container_app.app`) with health probes and ingress settings.

### Offline Terraform Validation
```bash
cd terraform
terraform fmt -check
terraform init -backend=false
terraform validate
```

---

## 7. Container Hardening & Health Probe Specifications

The production Docker setup implements security best practices:

* **Non-Root Execution**: Runs under unprivileged `USER nginx` user.
* **Health Check Endpoint**: `/health` location block in `nginx.conf` returning:
  ```json
  {"status":"UP","service":"azure-react-cicd","timestamp":"2026-08-14T00:26:00Z"}
  ```
* **Container Health Check Probe**:
  ```dockerfile
  HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget --quiet --tries=1 --spider http://localhost:80/health || exit 1
  ```

---

## 8. Local DevOps Validation Script

Run the one-click validation script to check linting, tests, and build locally:

### Windows PowerShell:
```powershell
.\scripts\devops-setup.ps1
```

### Linux / macOS Bash:
```bash
chmod +x ./scripts/devops-setup.sh
./scripts/devops-setup.sh
```

---

## 9. Real Azure Deployment Commands

To deploy this project to real Azure infrastructure (when cloud subscription is available):

```bash
# 1. Login to Azure
az login

# 2. Deploy Infrastructure via Terraform
cd terraform
terraform init
terraform apply -auto-approve

# 3. Build & Push Image to ACR
export ACR_NAME=$(terraform output -raw acr_login_server)
az acr login --name $ACR_NAME
docker build -t $ACR_NAME/azure-react-cicd:v1.0.0 ..
docker push $ACR_NAME/azure-react-cicd:v1.0.0

# 4. Update Container App Revision
az containerapp update \
  --name ca-azreactcicd-prod \
  --resource-group rg-azreactcicd-prod \
  --image $ACR_NAME/azure-react-cicd:v1.0.0
```

---

## 10. DevOps Interview Explanation Script

**Interviewer:** *"Can you walk me through your Azure DevOps & Infrastructure project?"*

> **Response:**  
> *"I designed an enterprise-grade CI/CD and Infrastructure-as-Code pipeline for a containerized React application targeting Microsoft Azure.
> 
> On the infrastructure side, I wrote Terraform and Azure Bicep modules to provision an Azure Container Registry, Log Analytics Workspace, and Azure Container Apps with ingress and health probes.
> 
> For CI/CD and DevSecOps, I implemented a multi-job GitHub Actions workflow that runs parallel jobs for ESLint code quality, Vitest unit testing, Terraform syntax validation (`terraform validate`), Hadolint Dockerfile linting, and Trivy security vulnerability scanning.
> 
> The application is containerized using a hardened multi-stage Dockerfile that executes under a non-root Nginx user with dynamic `/health` probes, served through Nginx security headers. All pipeline validation executes on GitHub-hosted runners to deliver a production-ready DevOps portfolio project with zero cloud infrastructure expense."*

---

## 11. Portfolio Project Description

> **Enterprise Azure CI/CD & Infrastructure-as-Code Pipeline**  
> *Production-grade DevOps engineering repository featuring Terraform & Bicep IaC modules, multi-job GitHub Actions workflow pipelines, Trivy & Hadolint DevSecOps security scanning, hardened multi-stage Dockerization with Nginx health probes, and Azure Container Apps deployment architecture.*  
> **Tech Stack**: Terraform, Azure Bicep, GitHub Actions, Docker, Nginx, Trivy, Hadolint, Vitest, ESLint, React, Node.js.
