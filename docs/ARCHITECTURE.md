# Technical Architecture & Infrastructure Specification

## 1. System Architecture Blueprint

```text
[ Developer ] ---> git push / PR ---> [ GitHub Repository ]
                                              |
                                              v
                                   [ GitHub Actions CI Runner ]
                                              |
        +----------------------+--------------+--------------+----------------------+
        |                      |                             |                      |
        v                      v                             v                      v
[ ESLint & Vitest ]   [ Hadolint & Trivy ]         [ Terraform Validate ]  [ Docker Buildx ]
(Quality Assurance)    (DevSecOps Security)           (IaC Formatting)     (Nginx Alpine Image)
        |                      |                             |                      |
        +----------------------+--------------+--------------+----------------------+
                                              |
                                              v
                                  [ Azure Container Registry ]
                                              |
                                              v
                                  [ Azure Container Apps ]
                                              |
                                              v
                                    [ End Users (HTTPS) ]
```

---

## 2. Infrastructure Component Breakdown

### A. Infrastructure-as-Code (Terraform & Bicep)
* **Resource Group**: `rg-azreactcicd-prod` (Contains all Azure resources).
* **Azure Container Registry (ACR)**: `acrazreactcicdprod` (Basic SKU, private OCI image storage).
* **Log Analytics Workspace**: `law-azreactcicd-prod` (30-day log retention for container stdout/stderr).
* **Azure Container App Environment**: `cae-azreactcicd-prod` (Serverless Kubernetes abstraction).
* **Azure Container App**: `ca-azreactcicd-prod` (0.25 vCPU, 0.5Gi RAM, auto-scaling 1-10 replicas, HTTP ingress port 80).

### B. Container Hardening & Security Baseline
1. **Non-Root Execution**: Container runs strictly under `USER nginx` UID to satisfy CIS Benchmarks.
2. **Health Probes**: Liveness and Readiness probes configured to ping `http://localhost:80/health`.
3. **Security Headers**:
   - `X-Frame-Options: DENY`
   - `X-Content-Type-Options: nosniff`
   - `Content-Security-Policy`

---

## 3. Cost Analysis & Financial Impact

| Component | Portfolio Mode (GitHub Actions) | Production Azure Mode |
| :--- | :--- | :--- |
| **CI/CD Execution** | **$0.00** (GitHub Free Tier 2,000 mins/mo) | **$0.00** |
| **Container Registry** | **$0.00** (Local Docker build validation) | ~$5.00 / month (Basic SKU) |
| **Container Apps Hosting** | **$0.00** | ~$7.00 / month (1M free requests/mo) |
| **Total Monthly Cost** | **$0.00** | **~$12.00 / month** |
