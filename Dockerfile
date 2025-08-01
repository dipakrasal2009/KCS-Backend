# Use Bun's official image
FROM oven/bun:latest

# Set working directory
WORKDIR /app

# Copy package.json and bun.lockb if available
COPY package.json ./

# Optional: If you have bun.lockb (after running `bun install`)


# Install dependencies
RUN bun install

# Copy the rest of your app
COPY . .

# Expose the port your app runs on (adjust if needed)
EXPOSE 3000

# Command to start the Bun app
CMD ["bun", "run", "start"]

