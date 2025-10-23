# Docker Compose - Microservicios (Hannia Bautista)

## Resumen
Este proyecto implementa una arquitectura de microservicios usando Docker Compose:
- **Frontend**: React (servido por un servidor Node propio).
- **Backend**: Node.js + Express (CRUD contra PostgreSQL).
- **Base de datos**: PostgreSQL con volumen persistente.

> El nombre del contenedor y la DB contienen mi nombre/apellido: `hannia` / `bautista`.  
> Endpoint especial: `GET /bautista` devuelve `Hannia Paola De Los Santos Bautista`.

## Arquitectura (diagrama mermaid)
```mermaid
flowchart LR
  subgraph Network_appnet
    F[Frontend - frontend_hannia (3000)]
    B[Backend - backend_bautista (5000)]
    DB[Postgres - db_bautista (5432)]
  end

  F -->|HTTP (fetch)| B
  B -->|SQL| DB
