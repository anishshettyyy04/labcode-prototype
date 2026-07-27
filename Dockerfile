FROM node:22-slim

WORKDIR /app

# Copy package files first for better layer caching
COPY package*.json ./

# Install production dependencies only
RUN npm install --omit=dev

# Copy application source code
COPY . .

# Expose port
EXPOSE 3000

# Start the Node.js server
CMD ["node", "server.js"]
