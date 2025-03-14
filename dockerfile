FROM nginx:alpine

# Remove the default nginx config
RUN rm /etc/nginx/conf.d/default.conf

# Copy the custom nginx configuration
COPY nginx.conf /etc/nginx/conf.d/

# Set up the working directory for Express app
WORKDIR /app

# Copy only necessary server files
COPY .env /app/
COPY package.json ./
COPY server.js ./
COPY src/ ./src/

# Install dependencies
RUN apk add --no-cache nodejs npm && npm install

# Expose port 3000
EXPOSE 3000

# Start the Express.js server
CMD ["npm", "start"]