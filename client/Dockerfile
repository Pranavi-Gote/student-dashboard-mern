# 1. Pick the engine
FROM node:22

# 2. Set working directory
WORKDIR /app

# 3. Copy dependencies
COPY package.json .

# 4. Install dependencies
RUN npm install

# 5. Copy the rest of the code
COPY . .

# 6. Open the port (Vite uses 5173)
EXPOSE 5173

# 7. Start the app (We add --host so it works inside Docker)
CMD ["npm", "run", "dev"]