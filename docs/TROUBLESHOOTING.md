# DevOps Incident Runbook & Troubleshooting Guide

Common failure modes and step-by-step remediation procedures for CI/CD, Containerization, and Infrastructure management.

---

## 1. CI Pipeline Failures

### Issue 1: ESLint Syntax Check Failure (`npm run lint`)
* **Symptom**: Stage 4 fails with `no-unused-vars` or formatting error.
* **Root Cause**: Unused import or syntax violation introduced in React code.
* **Remediation**:
  ```bash
  npm run lint
  # Fix highlighted lines or run auto-fixer:
  npx eslint . --fix
  ```

### Issue 2: Vitest Test Suite Failure (`npm test`)
* **Symptom**: Stage 5 fails with `AssertionError: expected ... to be present`.
* **Root Cause**: Broken DOM node or modified text string not matching component test assertions.
* **Remediation**:
  ```bash
  npx vitest run --reporter=verbose
  # Inspect failing file in tests/App.test.jsx
  ```

### Issue 3: Trivy / npm Audit Security Vulnerability Alert
* **Symptom**: Security job fails on HIGH or CRITICAL CVEs.
* **Remediation**:
  ```bash
  npm audit
  npm audit fix
  ```

---

## 2. Docker & Container Issues

### Issue 1: Health Probe Failure (`/health` returns 404 or connection refused)
* **Symptom**: `docker run` or Azure Container App revision enters `CrashLoopBackOff`.
* **Root Cause**: `nginx.conf` missing `/health` location block or Nginx process died.
* **Remediation**:
  ```bash
  # Test health endpoint locally inside container:
  docker exec -it <container_id> wget -qO- http://localhost:80/health
  ```

### Issue 2: Non-Root Permission Denied (`/var/run/nginx.pid` permission error)
* **Symptom**: Container fails on launch with `permission denied`.
* **Root Cause**: Nginx default process trying to write PID as root while running under `USER nginx`.
* **Remediation**: Ensure `Dockerfile` contains `chown -R nginx:nginx /var/run/nginx.pid /var/cache/nginx`.

---

## 3. Infrastructure & Terraform Errors

### Issue 1: Resource Group / ACR Name Collision
* **Symptom**: `Error: Code="ResourceGroupExists"` or ACR name not globally unique.
* **Remediation**: ACR names must be alphanumeric and globally unique across all Azure accounts. Update `app_name` in `terraform/variables.tf`.
