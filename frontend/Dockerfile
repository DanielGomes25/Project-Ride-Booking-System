# Use the official Node.js image as a base image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the frontend files
COPY . .

# Build the application
RUN npm run build

# Expose the port that the app will run on
EXPOSE 80

# Serve the built frontend using a static server (e.g., Vite preview)
CMD ["npm", "run", "preview"]