# Build stage
FROM node:18-slim AS build
WORKDIR /app

# Copiar package.json y instalar dependencias
COPY package.json ./
RUN npm install --omit=dev

# Copiar todo el código
COPY . .

# Final stage
FROM node:18-slim
WORKDIR /app
COPY --from=build /app /app

EXPOSE 5000
CMD ["node", "index.js"]
