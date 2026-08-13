import React, { useState } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  Play, 
  ShieldCheck, 
  Box, 
  Cloud, 
  Terminal, 
  GitBranch, 
  Layers, 
  RotateCcw,
  Cpu,
  Server,
  FileCode,
  Lock,
  Copy,
  Check
} from 'lucide-react';

const WORKFLOW_JOBS = [
  {
    id: 'lint-and-test',
    name: '🧪 Quality Assurance & Unit Tests',
    runner: 'ubuntu-latest',
    duration: '14s',
    status: 'passed',
    steps: [
      { name: 'Stage 1 — Checkout Repository', cmd: 'actions/checkout@v4', status: 'passed' },
      { name: 'Stage 2 — Setup Node.js v20', cmd: 'actions/setup-node@v4 (node 20)', status: 'passed' },
      { name: 'Stage 3 — Install Dependencies', cmd: 'npm ci', status: 'passed' },
      { name: 'Stage 4 — Run ESLint Code Quality', cmd: 'npm run lint', status: 'passed' },
      { name: 'Stage 5 — Run Vitest Unit Tests', cmd: 'npm test', status: 'passed' },
      { name: 'Stage 6 — Compile Vite SPA Bundle', cmd: 'npm run build', status: 'passed' }
    ],
    logs: [
      { time: '00:01', type: 'info', text: 'Initializing GitHub Actions runner (ubuntu-22.04 LTS)...' },
      { time: '00:03', type: 'info', text: 'actions/setup-node@v4: Configuring Node.js version 20.19.0...' },
      { time: '00:06', type: 'info', text: 'Executing npm ci --prefer-offline...' },
      { time: '00:08', type: 'success', text: 'Added 338 packages in 2.1s. Zero audit vulnerabilities found.' },
      { time: '00:10', type: 'info', text: 'Running ESLint flat config inspection on src/ and tests/...' },
      { time: '00:11', type: 'success', text: 'ESLint passed cleanly with 0 errors and 0 warnings.' },
      { time: '00:12', type: 'info', text: 'Executing Vitest unit test runner (jsdom environment)...' },
      { time: '00:13', type: 'success', text: '✓ tests/App.test.jsx (3 passed assertions in 84ms)' },
      { time: '00:14', type: 'success', text: 'Vite SPA production build generated in dist/ (1.73s).' }
    ]
  },
  {
    id: 'terraform-validate',
    name: '🏗️ Terraform IaC Validation',
    runner: 'ubuntu-latest',
    duration: '8s',
    status: 'passed',
    steps: [
      { name: 'Stage 1 — Checkout Repository', cmd: 'actions/checkout@v4', status: 'passed' },
      { name: 'Stage 2 — Setup Terraform v1.5+', cmd: 'hashicorp/setup-terraform@v3', status: 'passed' },
      { name: 'Stage 3 — Check Formatting', cmd: 'terraform fmt -check -diff', status: 'passed' },
      { name: 'Stage 4 — Initialize Modules', cmd: 'terraform init -backend=false', status: 'passed' },
      { name: 'Stage 5 — Validate Syntax', cmd: 'terraform validate', status: 'passed' }
    ],
    logs: [
      { time: '00:01', type: 'info', text: 'Setting up HashiCorp Terraform CLI v1.5.7...' },
      { time: '00:03', type: 'info', text: 'Running terraform fmt -check -recursive...' },
      { time: '00:04', type: 'success', text: 'All .tf files formatted correctly.' },
      { time: '00:06', type: 'info', text: 'Initializing modules (resource_group, container_registry, log_analytics, container_app)...' },
      { time: '00:07', type: 'success', text: 'Installed hashicorp/azurerm v3.100.0 provider.' },
      { time: '00:08', type: 'success', text: 'Success! The Terraform configuration is valid.' }
    ]
  },
  {
    id: 'security-scan',
    name: '🛡️ DevSecOps & Security Vulnerability Scan',
    runner: 'ubuntu-latest',
    duration: '11s',
    status: 'passed',
    steps: [
      { name: 'Stage 1 — Checkout Repository', cmd: 'actions/checkout@v4', status: 'passed' },
      { name: 'Stage 2 — Hadolint Linter', cmd: 'hadolint/hadolint-action@v3.1.0', status: 'passed' },
      { name: 'Stage 3 — Trivy Repository Audit', cmd: 'aquasecurity/trivy-action@master', status: 'passed' },
      { name: 'Stage 4 — npm Audit Scan', cmd: 'npm audit --audit-level=high', status: 'passed' }
    ],
    logs: [
      { time: '00:01', type: 'info', text: 'Running Hadolint Dockerfile security baseline checks...' },
      { time: '00:03', type: 'success', text: 'Hadolint score: 100% compliant. Non-root USER nginx verified.' },
      { time: '00:06', type: 'info', text: 'Scanning repository filesystem with Aqua Security Trivy...' },
      { time: '00:09', type: 'success', text: 'Trivy Scan Result: 0 CRITICAL, 0 HIGH vulnerabilities found.' },
      { time: '00:11', type: 'success', text: 'npm audit security check completed clean.' }
    ]
  },
  {
    id: 'docker-build-check',
    name: '🐳 Docker Multi-Stage Buildx',
    runner: 'ubuntu-latest',
    duration: '16s',
    status: 'passed',
    steps: [
      { name: 'Stage 1 — Checkout Repository', cmd: 'actions/checkout@v4', status: 'passed' },
      { name: 'Stage 2 — Setup Docker Buildx', cmd: 'docker/setup-buildx-action@v3', status: 'passed' },
      { name: 'Stage 3 — Multi-Stage Build', cmd: 'docker build -t azure-react-cicd .', status: 'passed' },
      { name: 'Stage 4 — Health Probe Check', cmd: 'HEALTHCHECK probe /health', status: 'passed' }
    ],
    logs: [
      { time: '00:01', type: 'info', text: 'Initializing Docker Buildx builder instance...' },
      { time: '00:05', type: 'info', text: 'Stage 1 (build): Compiling SPA in node:20-alpine...' },
      { time: '00:11', type: 'info', text: 'Stage 2 (runtime): Packaging static dist in nginx:alpine...' },
      { time: '00:14', type: 'info', text: 'Configuring HEALTHCHECK probe for http://localhost:80/health...' },
      { time: '00:16', type: 'success', text: 'Successfully tagged image azure-react-cicd:latest (24.2 MB).' }
    ]
  }
];

export default function App() {
  const [jobs, setJobs] = useState(WORKFLOW_JOBS);
  const [selectedJobId, setSelectedJobId] = useState('lint-and-test');
  const [activeTab, setActiveTab] = useState('dag');
  const [simState, setSimState] = useState('passing');
  const [copied, setCopied] = useState(false);

  const selectedJob = jobs.find(j => j.id === selectedJobId) || jobs[0];

  const handleSimulateError = (type) => {
    setSimState(type);
    if (type === 'eslint') {
      setJobs(prev => prev.map(job => {
        if (job.id === 'lint-and-test') {
          return {
            ...job,
            status: 'failed',
            steps: job.steps.map((s, i) => i === 3 ? { ...s, status: 'failed' } : i > 3 ? { ...s, status: 'skipped' } : s),
            logs: [
              ...job.logs.slice(0, 5),
              { time: '00:11', type: 'error', text: '❌ ESLint error: "simulationState" is assigned a value but never used (no-unused-vars)' },
              { time: '00:12', type: 'error', text: 'Process completed with exit code 1. Pipeline execution halted.' }
            ]
          };
        }
        if (job.id === 'docker-build-check') {
          return { ...job, status: 'skipped' };
        }
        return job;
      }));
    } else if (type === 'terraform') {
      setJobs(prev => prev.map(job => {
        if (job.id === 'terraform-validate') {
          return {
            ...job,
            status: 'failed',
            steps: job.steps.map((s, i) => i === 4 ? { ...s, status: 'failed' } : s),
            logs: [
              ...job.logs.slice(0, 4),
              { time: '00:07', type: 'error', text: '❌ Error: Reference to undeclared resource "azurerm_resource_group.wrong_name"' },
              { time: '00:08', type: 'error', text: 'Terraform validation failed with code 1.' }
            ]
          };
        }
        if (job.id === 'docker-build-check') {
          return { ...job, status: 'skipped' };
        }
        return job;
      }));
    }
  };

  const handleReset = () => {
    setSimState('passing');
    setJobs(WORKFLOW_JOBS);
  };

  const handleCopyLogs = () => {
    const text = selectedJob.logs.map(l => `[${l.time}] [${l.type.toUpperCase()}] ${l.text}`).join('\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isWorkflowHealthy = jobs.every(j => j.status === 'passed');

  return (
    <div className="command-center-container">
      {/* Top Navbar */}
      <header className="navbar">
        <div className="brand-section">
          <div className="brand-icon">
            <Cloud size={24} color="#ffffff" />
          </div>
          <div className="brand-title">
            <h1>GitHub Actions & Azure DevOps Command Center</h1>
            <p className="brand-subtitle">
              Workflow: <span style={{ color: '#58a6ff' }}>.github/workflows/azure-ci.yml</span> | Commit: <span style={{ color: '#238636' }}>44fd225</span>
            </p>
          </div>
        </div>

        <div className="header-status-group">
          <div className={`status-badge ${isWorkflowHealthy ? 'healthy' : 'failed'}`}>
            <span className="pulse-circle"></span>
            Workflow Status: <strong>{isWorkflowHealthy ? 'PASSING' : 'FAILED'}</strong>
          </div>
          <div className="status-badge">
            <GitBranch size={12} /> main
          </div>
          <div className="status-badge">
            <Cpu size={12} /> ubuntu-22.04 LTS
          </div>
          <div className="status-badge">
            <Lock size={12} /> DevSecOps Hardened
          </div>
        </div>
      </header>

      {/* Failure Simulator Bar */}
      <div className="control-bar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}>
          <Terminal size={16} color="#00a4ef" />
          <span><strong>CI/CD Failure Injector:</strong> Test workflow error isolation</span>
          {simState !== 'passing' && (
            <span className="status-badge failed" style={{ marginLeft: '10px' }}>
              Active Error: {simState.toUpperCase()}
            </span>
          )}
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button className="btn-danger" onClick={() => handleSimulateError('eslint')}>
            Inject ESLint Error
          </button>
          <button className="btn-danger" onClick={() => handleSimulateError('terraform')}>
            Inject Terraform Error
          </button>
          <button className="btn-success" onClick={handleReset}>
            <RotateCcw size={12} style={{ marginRight: '4px' }} /> Reset Workflow
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <nav className="nav-tabs">
        <button 
          className={`tab-link ${activeTab === 'dag' ? 'active' : ''}`}
          onClick={() => setActiveTab('dag')}
        >
          <Layers size={16} /> Multi-Job Pipeline DAG Graph
        </button>
        <button 
          className={`tab-link ${activeTab === 'logs' ? 'active' : ''}`}
          onClick={() => setActiveTab('logs')}
        >
          <Terminal size={16} /> Live Terminal Logs
        </button>
        <button 
          className={`tab-link ${activeTab === 'topology' ? 'active' : ''}`}
          onClick={() => setActiveTab('topology')}
        >
          <Cloud size={16} /> Terraform Infrastructure Topology
        </button>
        <button 
          className={`tab-link ${activeTab === 'security' ? 'active' : ''}`}
          onClick={() => setActiveTab('security')}
        >
          <ShieldCheck size={16} /> DevSecOps Audit (Trivy & Hadolint)
        </button>
      </nav>

      {/* TAB 1: Multi-Job Pipeline DAG Visualizer */}
      {activeTab === 'dag' && (
        <section className="card-panel">
          <div className="card-title">
            <span>Workflow DAG Grid (4 Parallel & Sequential Jobs)</span>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              Click any job card to inspect step execution & terminal logs
            </span>
          </div>

          <div className="dag-container">
            {jobs.map((job) => (
              <div 
                key={job.id} 
                className={`dag-job-card ${job.id === selectedJobId ? 'active-selected' : ''}`}
                onClick={() => {
                  setSelectedJobId(job.id);
                  setActiveTab('logs');
                }}
              >
                <div className="job-card-header">
                  <span className="job-name">
                    {job.name}
                  </span>
                  {job.status === 'passed' && <CheckCircle2 size={16} color="#3fb950" />}
                  {job.status === 'failed' && <XCircle size={16} color="#f85149" />}
                  {job.status === 'skipped' && <Play size={16} color="#6e7681" />}
                </div>

                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                  Runner: <code style={{ color: '#58a6ff' }}>{job.runner}</code> ({job.duration})
                </div>

                <div className="step-list">
                  {job.steps.map((step, idx) => (
                    <div key={idx} className={`step-item ${step.status}`}>
                      <span>{step.name}</span>
                      {step.status === 'passed' && <CheckCircle2 size={12} />}
                      {step.status === 'failed' && <XCircle size={12} />}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* TAB 2: ANSI Live Terminal Log Viewer */}
      {activeTab === 'logs' && (
        <section className="card-panel">
          <div className="card-title">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Terminal size={18} color="#58a6ff" />
              <span>Job Terminal Logs: <strong style={{ color: '#58a6ff' }}>{selectedJob.name}</strong></span>
            </div>
            <button className="btn-success" onClick={handleCopyLogs}>
              {copied ? <Check size={12} /> : <Copy size={12} />} {copied ? 'Copied!' : 'Copy Logs'}
            </button>
          </div>

          <div className="terminal-window">
            <div className="terminal-header">
              <div className="terminal-dots">
                <span className="dot red"></span>
                <span className="dot yellow"></span>
                <span className="dot green"></span>
              </div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                bash - runner@github-actions-ubuntu-22.04
              </span>
            </div>

            <div className="terminal-body">
              {selectedJob.logs.map((log, idx) => (
                <div key={idx} className="log-line">
                  <span className="log-time">[{log.time}]</span>
                  <span className={`log-msg ${log.type}`}>{log.text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* TAB 3: Terraform Infrastructure Topology Map */}
      {activeTab === 'topology' && (
        <section className="card-panel">
          <div className="card-title">
            <span>Terraform Infrastructure Topology (Parent-Child Modules)</span>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              Source: <code style={{ color: '#58a6ff' }}>terraform/main.tf</code>
            </span>
          </div>

          <div className="topology-grid">
            <div className="node-card">
              <span className="node-type">Child Module 1</span>
              <span className="node-title">rg-azreactcicd-prod</span>
              <span className="node-meta">Resource: azurerm_resource_group</span>
              <span className="status-badge healthy" style={{ marginTop: '0.5rem' }}>Location: eastus</span>
            </div>

            <div className="node-card">
              <span className="node-type">Child Module 2</span>
              <span className="node-title">acrazreactcicdprod</span>
              <span className="node-meta">Resource: azurerm_container_registry</span>
              <span className="status-badge healthy" style={{ marginTop: '0.5rem' }}>SKU: Basic (Admin Enabled)</span>
            </div>

            <div className="node-card">
              <span className="node-type">Child Module 3</span>
              <span className="node-title">law-azreactcicd-prod</span>
              <span className="node-meta">Resource: azurerm_log_analytics_workspace</span>
              <span className="status-badge healthy" style={{ marginTop: '0.5rem' }}>Retention: 30 Days</span>
            </div>

            <div className="node-card">
              <span className="node-type">Child Module 4</span>
              <span className="node-title">cae-azreactcicd-prod</span>
              <span className="node-meta">Resource: azurerm_container_app_environment</span>
              <span className="status-badge healthy" style={{ marginTop: '0.5rem' }}>Logs: Connected LAW</span>
            </div>

            <div className="node-card" style={{ borderColor: 'var(--azure-blue)' }}>
              <span className="node-type">Managed Container App</span>
              <span className="node-title">ca-azreactcicd-prod</span>
              <span className="node-meta">Probe: /health | Port 80</span>
              <span className="status-badge healthy" style={{ marginTop: '0.5rem' }}>Ingress: External FQDN</span>
            </div>
          </div>
        </section>
      )}

      {/* TAB 4: DevSecOps Vulnerability Audit */}
      {activeTab === 'security' && (
        <section className="card-panel">
          <div className="card-title">
            <span>DevSecOps Vulnerability & Compliance Report</span>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              Automated scanners: Aqua Trivy + Hadolint + npm audit
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.25rem' }}>
            <div className="node-card">
              <span className="node-type">Trivy Security</span>
              <span style={{ fontSize: '1.4rem', fontWeight: '800', color: '#3fb950' }}>0 CVEs</span>
              <span className="node-meta">0 Critical, 0 High Vulnerabilities</span>
            </div>
            <div className="node-card">
              <span className="node-type">Hadolint Linter</span>
              <span style={{ fontSize: '1.4rem', fontWeight: '800', color: '#58a6ff' }}>100% Pass</span>
              <span className="node-meta">Non-root USER nginx compliance</span>
            </div>
            <div className="node-card">
              <span className="node-type">Nginx Hardening</span>
              <span style={{ fontSize: '1.4rem', fontWeight: '800', color: '#3fb950' }}>Active</span>
              <span className="node-meta">X-Frame-Options, CSP, Gzip</span>
            </div>
          </div>

          <table className="security-table">
            <thead>
              <tr>
                <th>Scanner Tool</th>
                <th>Target Object</th>
                <th>Rule / CVE Severity</th>
                <th>Audit Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Aqua Trivy</td>
                <td>Filesystem & Dependencies</td>
                <td>CRITICAL, HIGH</td>
                <td><span className="status-badge healthy">✓ PASSED</span></td>
              </tr>
              <tr>
                <td>Hadolint Action</td>
                <td>Dockerfile</td>
                <td>DL3006, DL3007 (Base Image Pinning)</td>
                <td><span className="status-badge healthy">✓ PASSED</span></td>
              </tr>
              <tr>
                <td>npm audit</td>
                <td>package-lock.json</td>
                <td>Audit-level high</td>
                <td><span className="status-badge healthy">✓ PASSED</span></td>
              </tr>
              <tr>
                <td>Nginx Security Probe</td>
                <td>/health Endpoint</td>
                <td>HTTP 200 JSON Probe</td>
                <td><span className="status-badge healthy">✓ PASSED</span></td>
              </tr>
            </tbody>
          </table>
        </section>
      )}

      {/* Footer */}
      <footer style={{ textAlign: 'center', fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '2rem', borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
        GitHub Actions & Azure DevOps Operations Center | Automated CI/CD Pipeline & Modular Infrastructure-as-Code.
      </footer>
    </div>
  );
}
