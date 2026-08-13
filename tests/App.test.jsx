import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../src/App.jsx';

describe('GitHub Actions & Azure DevOps Command Center', () => {
  it('renders command center title', () => {
    render(<App />);
    const heading = screen.getByText(/GitHub Actions & Azure DevOps Command Center/i);
    expect(heading).toBeInTheDocument();
  });

  it('renders multi-job DAG workflow jobs', () => {
    render(<App />);
    expect(screen.getByText(/Quality Assurance & Unit Tests/i)).toBeInTheDocument();
    expect(screen.getByText(/Terraform IaC Validation/i)).toBeInTheDocument();
    expect(screen.getByText(/DevSecOps & Security Vulnerability Scan/i)).toBeInTheDocument();
    expect(screen.getByText(/Docker Multi-Stage Buildx/i)).toBeInTheDocument();
  });

  it('displays active workflow status chip', () => {
    render(<App />);
    expect(screen.getByText('PASSING')).toBeInTheDocument();
  });
});
