# Stage 1: Build Angular application
FROM node:22-alpine AS builder

WORKDIR /app

# Copy package and install dependencies
COPY package*.json ./
RUN npm ci --prefer-offline --no-audit

# Copy sources and tokens
COPY . .

# Build nexa-ui library then web-style application
RUN npm run build:all

# Stage 2: Serve with Nginx
FROM nginx:alpine

COPY --from=builder /app/dist/nexa-design-lab/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 4200

CMD ["nginx", "-g", "daemon off;"]
