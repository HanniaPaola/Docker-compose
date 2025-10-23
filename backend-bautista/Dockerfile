# Etapa de construcción (si necesitáramos transpilar)
FROM node:18-slim AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --production
COPY . .

# Imagen final (ligera por usar slim)
FROM node:18-slim
WORKDIR /app
COPY --from=build /app /app
EXPOSE 5000
CMD ["node", "index.js"]
