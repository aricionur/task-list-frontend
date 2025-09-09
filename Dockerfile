# Stage 1: Build the React application
FROM node:20-alpine AS build

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and yarn.lock files
COPY package.json yarn.lock ./

# Install project dependencies using Yarn
RUN yarn install --frozen-lockfile

# Copy the rest of the application source code
COPY . .

# Build the project for production
RUN yarn build

# Stage 2: Serve the production build with Nginx
FROM nginx:alpine

# Copy the built files from the 'build' stage
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80 to the outside world
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
