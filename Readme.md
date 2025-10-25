# Proyecto: Docker Compose - Microservicios
Alumno: Hannia Paola De Los Santos Bautista

## Descripción
Arquitectura de microservicios con Docker Compose: frontend (React + Express), backend (Node.js API) y base de datos (MySQL) con persistencia por volumen.

## Servicios
- **frontend_hannia**: React app compilada y servida por Express. Puerto 3000.
- **backend_bautista**: API en Node.js que expone endpoints CRUD y el endpoint `/bautista`. Puerto 5000.
- **db_bautista**: MySQL con volumen `db_bautista_data`. Puerto 3306.

## Requisitos
- Docker & Docker Compose instalados.

## Levantar entorno
```bash
git clone <https://github.com/HanniaPaola/Docker-compose.git>
cd Docker-compose
docker-compose up --build -d
