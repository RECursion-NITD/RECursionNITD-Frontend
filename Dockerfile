# Use Node 20 slim image
FROM node:20-slim

WORKDIR /app

COPY package*.json /app/

RUN npm config set fetch-retry-maxtimeout 600000 \
    && npm config set fetch-retries 5 \
    && npm config set fetch-retry-mintimeout 10000 \
    && npm install --no-audit --no-fund

COPY . /app/

EXPOSE 3000

# Start development server
CMD ["npm", "start"]
