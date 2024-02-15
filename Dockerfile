# Use an official Node.js runtime as a parent image
FROM node:14

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Bundle app source
COPY . .

# Build TypeScript to JavaScript
RUN npm run build

# Expose port 3000 for the application
EXPOSE 3000

# Define the command to run the app
CMD [ "node", "dist/server.js" ]
