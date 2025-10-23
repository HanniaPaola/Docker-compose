# Stage build
FROM node:18-slim as build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage final: servidor express para servir static (evita nginx, usamos nuestro propio servidor)
FROM node:18-slim
WORKDIR /app
COPY --from=build /app/build ./build
COPY server.js .
RUN npm init -y && npm i express
EXPOSE 3000
CMD ["node", "server.js"]
