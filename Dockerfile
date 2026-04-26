# Stage 1: Build & Install dependencies
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install ALL dependencies (including dev for building/validating if needed)
# Using ci for reproducible builds
RUN npm ci

# Copy the rest of the application code
COPY . .

# Run the pre-deploy validation script
RUN npm run build

# Stage 2: Production runtime
FROM node:18-alpine AS runner

# Set Node to production mode
ENV NODE_ENV=production

# Create a non-root user for security
RUN addgroup -S nodeapp && adduser -S nodeapp -G nodeapp

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install ONLY production dependencies
RUN npm ci --only=production && npm cache clean --force

# Copy application source from builder stage
COPY --from=builder /app/public ./public
COPY --from=builder /app/src ./src
COPY --from=builder /app/server.js ./

# Change ownership to the non-root user
RUN chown -R nodeapp:nodeapp /app

# Switch to the non-root user
USER nodeapp

# Expose the configured port
EXPOSE 3000

# Start the server
CMD ["node", "server.js"]
