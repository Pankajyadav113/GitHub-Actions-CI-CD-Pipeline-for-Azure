# =======================================================
# Stage 1: Build Stage (Node.js 20 Alpine)
# =======================================================
FROM node:20-alpine AS build

LABEL org.opencontainers.image.title="Azure React CI/CD App" \
      org.opencontainers.image.description="Multi-stage production build container" \
      org.opencontainers.image.vendor="DevOps Engineering"

WORKDIR /app

# Copy dependency manifests
COPY package*.json ./

# Install exact dependencies using package-lock.json
RUN npm ci

# Copy source code
COPY . .

# Build production React SPA bundle into /app/dist
RUN npm run build

# =======================================================
# Stage 2: Production Serving Stage (Nginx Alpine Hardened)
# =======================================================
FROM nginx:alpine

# Copy custom Nginx security and health-check configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy production static assets from Stage 1 build output
COPY --from=build /app/dist /usr/share/nginx/html

# Adjust permissions for non-root nginx execution
RUN touch /var/run/nginx.pid && \
    chown -R nginx:nginx /var/run/nginx.pid /var/cache/nginx /usr/share/nginx/html

# Expose HTTP port 80
EXPOSE 80

# Production Container Health Check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost:80/health || exit 1

# Switch to non-root nginx user
USER nginx

# Launch Nginx in non-daemon mode
CMD ["nginx", "-g", "daemon off;"]
