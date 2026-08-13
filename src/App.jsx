import React, { useState } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  Play, 
  ShieldCheck, 
  Box, 
  Cloud, 
  Terminal, 
  Cpu, 
  GitBranch, 
  Layers, 
  RotateCcw,
  Zap,
  Server
} from 'lucide-react';

const INITIAL_STEPS = [
  {
    id: 1,
    title: 'Checkout Repository',
    action: 'actions/checkout@v4',
    desc: 'Downloads repository source code into the GitHub Actions runner.',
    status: 'passed'
  },
  {
    id: 2,
    title: 'Setup Node.js Environment',
    action: 'actions/setup-node@v4 (v20)',
    desc: 'Configures Node.js 20 runtime with npm dependency caching.',
    status: 'passed'
  },
  {
    id: 3,
    title: 'Install Dependencies',
    action: 'npm ci',
    desc: 'Installs exact production & dev dependencies from package-lock.json.',
    status: 'passed'
  },
  {
    id: 4,
    title: 'Code Quality Validation',
    action: 'npm run lint',
    desc: 'Executes ESLint flat config rules for JSX syntax and code cleanliness.',
    status: 'passed'
  },
  {
    id: 5,
    title: 'Automated Unit Tests',
    action: 'npm test',
    desc: 'Runs Vitest test suite with jsdom environment assertions.',
    status: 'passed'
  },
  {
    id: 6,
    title: 'React Production Build',
    action: 'npm run build',
    desc: 'Compiles optimized SPA static bundle into dist/ distribution directory.',
    status: 'passed'
  },
  {
    id: 7,
    title: 'Build Docker Container',
    action: 'docker build -t azure-react-cicd .',
    desc: 'Compiles lightweight multi-stage Docker image served via Nginx Alpine.',
    status: 'passed'
  },
  {
    id: 8,
    title: 'Azure-Ready Verification',
    action: 'CI Validation Completed',
    desc: 'Container validation verified locally without incurring Azure infrastructure costs.',
    status: 'passed'
  }
];

export default function App() {
  const [steps, setSteps] = useState(INITIAL_STEPS);
  const [activeTab, setActiveTab] = useState('ci-runner');
  const [simulationState, setSimulationState] = useState('all-passed');

  const handleSimulateLintFailure = () => {
    setSimulationState('lint-failed');
    setSteps(prev => prev.map(step => {
      if (step.id === 4) return { ...step, status: 'failed', desc: '❌ ESLint error: Unused variable detected in App.jsx' };
      if (step.id > 4) return { ...step, status: 'skipped', desc: 'Skipped due to upstream pipeline failure' };
      return step;
    }));
  };

  const handleSimulateTestFailure = () => {
    setSimulationState('test-failed');
    setSteps(prev => prev.map(step => {
      if (step.id === 5) return { ...step, status: 'failed', desc: '❌ Vitest error: Expected "Azure CI/CD Dashboard" to be present' };
      if (step.id > 5) return { ...step, status: 'skipped', desc: 'Skipped due to upstream pipeline failure' };
      return { ...step, status: 'passed' };
    }));
  };

  const handleResetSimulation = () => {
    setSimulationState('all-passed');
    setSteps(INITIAL_STEPS);
  };

  const overallStatus = steps.some(s => s.status === 'failed') ? 'FAILED' : 'PASSING';

  return (
    <div className="dashboard-container">
      {/* Top Header */}
      <header className="header">
        <div className="header-title">
          <div className="azure-logo-badge">
            <Cloud size={28} color="#ffffff" />
          </div>
          <div>
            <h1>Azure React CI/CD Pipeline Dashboard</h1>
            <p className="header-subtitle">
              Automated GitHub Actions workflow & Multi-stage Docker containerization
            </p>
          </div>
        </div>

        <div className="badge-group">
          <div className={`status-chip ${overallStatus === 'PASSING' ? 'success' : 'failed'}`}>
            <span className="pulse-dot"></span>
            CI Pipeline: <strong>{overallStatus}</strong>
          </div>
          <div className="status-chip">
            <Cpu size={14} /> Node v20
          </div>
          <div className="status-chip">
            <Box size={14} /> Docker Multi-Stage
          </div>
          <div className="status-chip">
            <GitBranch size={14} /> main
          </div>
        </div>
      </header>

      {/* Metrics Bar */}
      <section className="metrics-grid">
        <div className="metric-card">
          <span className="metric-label">Pipeline Duration</span>
          <span className="metric-value">38s</span>
          <span className="metric-sub"><Zap size={14} /> Optimized npm cache</span>
        </div>
        <div className="metric-card">
          <span className="metric-label">Unit Test Status</span>
          <span className="metric-value">100%</span>
          <span className="metric-sub"><ShieldCheck size={14} /> Vitest + JSDOM</span>
        </div>
        <div className="metric-card">
          <span className="metric-label">Docker Image Size</span>
          <span className="metric-value">24.2 MB</span>
          <span className="metric-sub"><Server size={14} /> Nginx Alpine base</span>
        </div>
        <div className="metric-card">
          <span className="metric-label">Azure Cost Impact</span>
          <span className="metric-value">$0.00</span>
          <span className="metric-sub"><CheckCircle2 size={14} /> GitHub Runner execution</span>
        </div>
      </section>

      {/* Simulation Controls */}
      <section className="glass-panel" style={{ padding: '1rem 1.5rem', marginBottom: '2rem' }}>
        <div className="simulation-bar">
          <div className="simulation-info">
            <Terminal size={18} color="#00a4ef" />
            <span>
              <strong>CI/CD Failure Simulator:</strong> Test how GitHub Actions reacts to broken code 
              {simulationState !== 'all-passed' && (
                <span className="step-cmd" style={{ marginLeft: '10px', color: '#ef4444', backgroundColor: 'rgba(239, 68, 68, 0.15)' }}>
                  Active Mode: {simulationState}
                </span>
              )}
            </span>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button className="sim-btn" onClick={handleSimulateLintFailure}>
              Simulate Lint Error
            </button>
            <button className="sim-btn" onClick={handleSimulateTestFailure}>
              Simulate Test Error
            </button>
            <button className="reset-btn" onClick={handleResetSimulation}>
              <RotateCcw size={14} style={{ marginRight: '4px' }} /> Reset Pipeline
            </button>
          </div>
        </div>
      </section>

      {/* Pipeline Steps Grid */}
      <section className="glass-panel">
        <div className="panel-header">
          <div className="panel-title">
            <Layers size={22} />
            <span>Automated CI/CD Pipeline Stages</span>
          </div>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Trigger: push / pull_request [main]
          </span>
        </div>

        <div className="pipeline-steps-grid">
          {steps.map((step) => (
            <div key={step.id} className={`step-card ${step.status}`}>
              <div className="step-header">
                <span className="step-number">Stage {step.id}</span>
                {step.status === 'passed' && <CheckCircle2 size={18} color="#10b981" />}
                {step.status === 'failed' && <XCircle size={18} color="#ef4444" />}
                {step.status === 'skipped' && <Play size={18} color="#64748b" />}
              </div>
              <h3 className="step-title">{step.title}</h3>
              <div className="step-cmd">{step.action}</div>
              <p className="step-desc">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Conceptual Architecture Explorer */}
      <section className="glass-panel">
        <div className="panel-header">
          <div className="panel-title">
            <Cloud size={22} />
            <span>Architecture & Azure Cloud Strategy</span>
          </div>
        </div>

        <div className="architecture-tabs">
          <button 
            className={`tab-btn ${activeTab === 'ci-runner' ? 'active' : ''}`}
            onClick={() => setActiveTab('ci-runner')}
          >
            <Terminal size={16} /> GitHub Runner Execution (Active)
          </button>
          <button 
            className={`tab-btn ${activeTab === 'azure-target' ? 'active' : ''}`}
            onClick={() => setActiveTab('azure-target')}
          >
            <Cloud size={16} /> Production Azure Target Architecture
          </button>
        </div>

        {activeTab === 'ci-runner' ? (
          <div className="architecture-box">
{`[Developer] ---> (git push / Pull Request) ---> [GitHub Repository]
                                                         |
                                                         v
                                                [GitHub Actions Runner]
                                                         |
  +------------------------------------------------------+------------------------------------------------------+
  |                                                                                                             |
  v                                                                                                             v
[Node.js 20 Environment]                                                                       [Docker Build Engine]
  |-- npm ci                                                                                     |-- Multi-stage build
  |-- ESLint Checks                                                                              |-- Node 20 Compile -> dist/
  |-- Vitest Unit Tests                                                                          |-- Nginx Alpine Serve
  |-- React Vite Bundle                                                                          |-- Image Validation
  v                                                                                              v
  +------------------------------------------------------+------------------------------------------------------+
                                                         |
                                                         v
                                              [✓ CI Validation Passed]
                                             (Zero Paid Infrastructure)`}
          </div>
        ) : (
          <div className="architecture-box">
{`[GitHub Actions Runner]
       |
       v
[Docker Multi-Stage Build]
       |
       v
[Azure Container Registry (ACR)]
       |
       +-----------------------------------+-----------------------------------+
       |                                   |                                   |
       v                                   v                                   v
[Azure Container Apps]           [Azure App Service]             [Azure Kubernetes Service (AKS)]
(Serverless Containers)          (Managed Web Apps)               (Microservice Orchestration)
       |                                   |                                   |
       +-----------------------------------+-----------------------------------+
                                           |
                                           v
                                    [Azure Front Door / CDN]
                                           |
                                           v
                                     [End Users]`}
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="footer">
        Azure React CI/CD Pipeline | Designed for high-reliability DevOps automation with zero cloud infrastructure overhead.
      </footer>
    </div>
  );
}
