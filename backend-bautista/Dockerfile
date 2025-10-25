# Stage build
FROM node:18-slim as build
WORKDIR /app

# Copiar package.json y lock
COPY package*.json ./
RUN npm ci

# Copiar todo el código y generar build
COPY . ./
RUN npm run build

# Stage final: servidor Express para servir static
FROM node:18-slim
WORKDIR /app

# Copiar el build completo y server.js
COPY --from=build /app/build ./build
COPY server.js ./server.js
COPY package*.json ./
RUN npm install express node-fetch

EXPOSE 3000
CMD ["node", "server.js"]