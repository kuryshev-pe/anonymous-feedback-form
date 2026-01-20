# Multi-stage build for frontend
FROM node:18-alpine as build

WORKDIR /app
COPY package*.json ./
RUN npm install && npm ci

# Copy source code and build
COPY . .
RUN npm run build

# Production stage
FROM nginx:1.23-alpine

# Copy built files from build stage
COPY --from=build /app/build /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
