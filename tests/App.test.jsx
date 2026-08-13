import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../src/App.jsx';

describe('Azure React CI/CD Dashboard', () => {
  it('renders main dashboard heading', () => {
    render(<App />);
    const heading = screen.getByText(/Azure React CI\/CD Pipeline Dashboard/i);
    expect(heading).toBeInTheDocument();
  });

  it('renders pipeline stages grid cards', () => {
    render(<App />);
    expect(screen.getByText('Checkout Repository')).toBeInTheDocument();
    expect(screen.getByText('Setup Node.js Environment')).toBeInTheDocument();
    expect(screen.getByText('Install Dependencies')).toBeInTheDocument();
    expect(screen.getByText('Code Quality Validation')).toBeInTheDocument();
    expect(screen.getByText('Automated Unit Tests')).toBeInTheDocument();
    expect(screen.getByText('React Production Build')).toBeInTheDocument();
    expect(screen.getByText('Build Docker Container')).toBeInTheDocument();
  });

  it('displays cost optimization metric', () => {
    render(<App />);
    expect(screen.getByText('$0.00')).toBeInTheDocument();
  });
});
