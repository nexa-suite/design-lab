# Stage 1: Build Astro static site
FROM node:22-alpine AS builder

WORKDIR /app

# Copy package and install dependencies
COPY package*.json ./
RUN npm install

# Copy sources
COPY . .

# Build static output
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 4201

CMD ["nginx", "-g", "daemon off;"]
