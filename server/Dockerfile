# 1. Pick the engine (Node.js)
FROM node:18-alpine

# 2. Set the working directory inside the box
WORKDIR /app

# 3. Copy the dependency list first (for speed)
COPY package.json .

# 4. Install the dependencies
RUN npm install

# 5. Copy the rest of the code
COPY . .

# 6. Open the port
EXPOSE 5000

# 7. Start the server
CMD ["node", "server.js"]