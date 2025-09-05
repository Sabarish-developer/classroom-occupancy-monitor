# Use official Node.js runtime (slim version for smaller size)
FROM node:18-slim

# Set working directory in the container
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci --only=production

# Copy source code
COPY src ./src

# Copy public.key (safe to include in image)
RUN mkdir -p keys
COPY keys/public.key ./keys/public.key

# Expose default port (Render assigns the actual one via $PORT)
EXPOSE 8080

# Launch the app
CMD ["node", "src/index.js"]
